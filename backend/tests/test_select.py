"""Tests for the document selection endpoint."""

from unittest.mock import patch

from fastapi.testclient import TestClient

from app.documents.select import SelectionExtraction
from app.main import app

client = TestClient(app)


@patch("app.routers.chat.extract_fields")
def test_select_returns_reply_no_confirmation(mock_extract):
    mock_extract.return_value = SelectionExtraction(
        reply="What kind of document do you need?",
        confirmed_doc_type=None,
    )
    resp = client.post(
        "/api/chat/select",
        json={"messages": [{"role": "user", "content": "Hello"}]},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["reply"] == "What kind of document do you need?"
    assert data["confirmed_doc_type"] is None


@patch("app.routers.chat.extract_fields")
def test_select_confirms_doc_type(mock_extract):
    mock_extract.return_value = SelectionExtraction(
        reply="I'll set up a Mutual NDA for you.",
        confirmed_doc_type="nda",
    )
    resp = client.post(
        "/api/chat/select",
        json={"messages": [{"role": "user", "content": "I need an NDA"}]},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["confirmed_doc_type"] == "nda"


@patch("app.routers.chat.extract_fields")
def test_select_llm_error_returns_502(mock_extract):
    mock_extract.side_effect = RuntimeError("LLM error")
    resp = client.post(
        "/api/chat/select",
        json={"messages": [{"role": "user", "content": "Hello"}]},
    )
    assert resp.status_code == 502
