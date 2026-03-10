"""Tests for auth endpoints."""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_signup_creates_user():
    resp = client.post("/api/auth/signup", json={
        "email": "test@example.com",
        "password": "secret123",
        "name": "Test User",
    })
    assert resp.status_code == 200
    data = resp.json()
    assert data["email"] == "test@example.com"
    assert data["name"] == "Test User"
    assert "prelegal_session" in resp.cookies


def test_signup_duplicate_email():
    client.post("/api/auth/signup", json={
        "email": "dup@example.com",
        "password": "pass1",
        "name": "First",
    })
    resp = client.post("/api/auth/signup", json={
        "email": "dup@example.com",
        "password": "pass2",
        "name": "Second",
    })
    assert resp.status_code == 400
    assert "already registered" in resp.json()["detail"]


def test_login_valid_credentials():
    client.post("/api/auth/signup", json={
        "email": "login@example.com",
        "password": "mypass",
        "name": "Login User",
    })
    resp = client.post("/api/auth/login", json={
        "email": "login@example.com",
        "password": "mypass",
    })
    assert resp.status_code == 200
    assert resp.json()["email"] == "login@example.com"
    assert "prelegal_session" in resp.cookies


def test_login_wrong_password():
    client.post("/api/auth/signup", json={
        "email": "wrong@example.com",
        "password": "correct",
        "name": "Wrong",
    })
    resp = client.post("/api/auth/login", json={
        "email": "wrong@example.com",
        "password": "incorrect",
    })
    assert resp.status_code == 400


def test_me_with_session():
    resp = client.post("/api/auth/signup", json={
        "email": "me@example.com",
        "password": "pass",
        "name": "Me",
    })
    cookie = resp.cookies["prelegal_session"]
    resp = client.get("/api/auth/me", cookies={"prelegal_session": cookie})
    assert resp.status_code == 200
    assert resp.json()["user"]["email"] == "me@example.com"


def test_me_without_session():
    resp = client.get("/api/auth/me")
    assert resp.status_code == 200
    assert resp.json()["user"] is None


def test_logout_clears_cookie():
    resp = client.post("/api/auth/logout")
    assert resp.status_code == 200
    # Cookie should be deleted (max-age=0)
    assert "prelegal_session" in resp.headers.get("set-cookie", "")
