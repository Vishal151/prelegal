"""Tests for the chat endpoint and AI service."""

from unittest.mock import patch

import pytest
from fastapi.testclient import TestClient

from app.ai_service import extraction_to_field_dict
from app.documents.nda import NdaExtraction
from app.main import app

client = TestClient(app)


# --- Unit tests for extraction_to_field_dict ---


def test_extraction_to_field_dict_filters_none():
    ext = NdaExtraction(
        reply="Hello",
        party1Company="Acme Inc.",
        governingLaw="California",
    )
    result = extraction_to_field_dict(ext)
    assert result == {"party1Company": "Acme Inc.", "governingLaw": "California"}
    assert "reply" not in result
    assert "purpose" not in result


def test_extraction_to_field_dict_empty():
    ext = NdaExtraction(reply="Hi there")
    result = extraction_to_field_dict(ext)
    assert result == {}


def test_extraction_to_field_dict_all_fields():
    ext = NdaExtraction(
        reply="Done",
        purpose="Business eval",
        effectiveDate="2026-01-01",
        mndaTerm="1year",
        termOfConfidentiality="perpetual",
        governingLaw="New York",
        jurisdiction="Manhattan, New York",
        party1Company="Acme",
        party1Name="Jane",
        party1Title="CEO",
        party1Address="jane@acme.com",
        party1Date="2026-01-01",
        party2Company="Beta",
        party2Name="John",
        party2Title="CTO",
        party2Address="john@beta.com",
        party2Date="2026-01-02",
    )
    result = extraction_to_field_dict(ext)
    assert len(result) == 16
    assert "reply" not in result


# --- Integration tests for POST /api/chat/nda ---


@patch("app.routers.chat.extract_fields")
def test_chat_nda_returns_reply_and_fields(mock_extract):
    mock_extract.return_value = NdaExtraction(
        reply="I see you mentioned Acme.",
        party1Company="Acme Inc.",
    )
    resp = client.post(
        "/api/chat/nda",
        json={"messages": [{"role": "user", "content": "My company is Acme Inc."}]},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["reply"] == "I see you mentioned Acme."
    assert data["fields"] == {"party1Company": "Acme Inc."}


@patch("app.routers.chat.extract_fields")
def test_chat_nda_no_fields_extracted(mock_extract):
    mock_extract.return_value = NdaExtraction(reply="Could you tell me more?")
    resp = client.post(
        "/api/chat/nda",
        json={"messages": [{"role": "user", "content": "Hello"}]},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["reply"] == "Could you tell me more?"
    assert data["fields"] == {}


def test_chat_nda_invalid_request():
    resp = client.post("/api/chat/nda", json={"messages": "not a list"})
    assert resp.status_code == 422


def test_chat_nda_invalid_role():
    resp = client.post(
        "/api/chat/nda",
        json={"messages": [{"role": "system", "content": "hack"}]},
    )
    assert resp.status_code == 422


@patch("app.routers.chat.extract_fields")
def test_chat_nda_llm_error_returns_502(mock_extract):
    mock_extract.side_effect = RuntimeError("LLM unavailable")
    resp = client.post(
        "/api/chat/nda",
        json={"messages": [{"role": "user", "content": "Hello"}]},
    )
    assert resp.status_code == 502


def test_chat_unknown_doc_type_returns_422():
    resp = client.post(
        "/api/chat/unknown-type",
        json={"messages": [{"role": "user", "content": "Hello"}]},
    )
    assert resp.status_code == 422
