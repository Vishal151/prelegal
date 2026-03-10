"""Tests for the document registry."""

from app.documents.registry import get_registry


def test_registry_has_all_doc_types():
    registry = get_registry()
    expected = [
        "nda", "csa", "sla", "design-partner", "psa",
        "dpa", "partnership", "software-license", "pilot",
        "baa", "ai-addendum",
    ]
    assert set(registry.keys()) == set(expected)


def test_registry_definitions_have_required_attrs():
    registry = get_registry()
    for slug, defn in registry.items():
        assert defn.doc_type == slug
        assert defn.display_name
        assert defn.extraction_model is not None
        assert defn.system_prompt
        # All extraction models should have a 'reply' field
        assert "reply" in defn.extraction_model.model_fields


def test_generic_endpoint_works_for_csa():
    """Verify the generic endpoint routes to CSA correctly."""
    from unittest.mock import patch
    from fastapi.testclient import TestClient
    from app.documents.csa import CsaExtraction
    from app.main import app

    client = TestClient(app)

    with patch("app.routers.chat.extract_fields") as mock_extract:
        mock_extract.return_value = CsaExtraction(
            reply="Setting up your CSA.",
            providerCompany="CloudCo",
        )
        resp = client.post(
            "/api/chat/csa",
            json={"messages": [{"role": "user", "content": "CloudCo provides SaaS"}]},
        )
        assert resp.status_code == 200
        data = resp.json()
        assert data["fields"] == {"providerCompany": "CloudCo"}
