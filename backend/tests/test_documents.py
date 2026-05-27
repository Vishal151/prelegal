"""Tests for document persistence endpoints."""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def _signup_and_get_cookie(email: str = "docuser@example.com") -> str:
    resp = client.post(
        "/api/auth/signup",
        json={
            "email": email,
            "password": "pass",
            "name": "Doc User",
        },
    )
    return resp.cookies["prelegal_session"]


def test_save_document():
    cookie = _signup_and_get_cookie("save@example.com")
    resp = client.post(
        "/api/documents",
        json={
            "doc_type": "nda",
            "fields": {"party1Company": "Acme"},
            "chat": [{"role": "user", "content": "hello"}],
        },
        cookies={"prelegal_session": cookie},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["doc_type"] == "nda"
    assert data["fields"]["party1Company"] == "Acme"
    assert len(data["chat"]) == 1


def test_save_document_upserts():
    cookie = _signup_and_get_cookie("upsert@example.com")
    client.post(
        "/api/documents",
        json={
            "doc_type": "csa",
            "fields": {"providerName": "V1"},
            "chat": [],
        },
        cookies={"prelegal_session": cookie},
    )
    resp = client.post(
        "/api/documents",
        json={
            "doc_type": "csa",
            "fields": {"providerName": "V2"},
            "chat": [{"role": "user", "content": "update"}],
        },
        cookies={"prelegal_session": cookie},
    )
    assert resp.json()["fields"]["providerName"] == "V2"


def test_list_documents():
    cookie = _signup_and_get_cookie("list@example.com")
    client.post(
        "/api/documents",
        json={
            "doc_type": "nda",
            "fields": {},
            "chat": [],
        },
        cookies={"prelegal_session": cookie},
    )
    resp = client.get("/api/documents", cookies={"prelegal_session": cookie})
    assert resp.status_code == 200
    assert len(resp.json()) >= 1


def test_load_document():
    cookie = _signup_and_get_cookie("load@example.com")
    client.post(
        "/api/documents",
        json={
            "doc_type": "sla",
            "fields": {"serviceName": "API"},
            "chat": [],
        },
        cookies={"prelegal_session": cookie},
    )
    resp = client.get("/api/documents/sla", cookies={"prelegal_session": cookie})
    assert resp.status_code == 200
    assert resp.json()["fields"]["serviceName"] == "API"


def test_load_document_not_found():
    cookie = _signup_and_get_cookie("notfound@example.com")
    resp = client.get("/api/documents/baa", cookies={"prelegal_session": cookie})
    assert resp.status_code == 404


def test_documents_require_auth():
    resp = client.get("/api/documents")
    assert resp.status_code == 401

    resp = client.post(
        "/api/documents",
        json={
            "doc_type": "nda",
            "fields": {},
            "chat": [],
        },
    )
    assert resp.status_code == 401


def test_delete_document():
    cookie = _signup_and_get_cookie("delete@example.com")
    resp = client.post(
        "/api/documents",
        json={
            "doc_type": "pilot",
            "fields": {},
            "chat": [],
        },
        cookies={"prelegal_session": cookie},
    )
    doc_id = resp.json()["id"]
    resp = client.delete(
        f"/api/documents/{doc_id}", cookies={"prelegal_session": cookie}
    )
    assert resp.status_code == 200
    assert resp.json()["message"] == "Deleted"
