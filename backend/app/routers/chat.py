"""Chat endpoints for document selection and AI-assisted field extraction."""

import logging
from typing import Any, Literal

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.ai_service import extract_fields, extraction_to_field_dict
from app.documents.registry import get_registry
from app.documents.select import SelectionExtraction, SYSTEM_PROMPT as SELECT_PROMPT

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/chat", tags=["chat"])


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage]


class ChatResponse(BaseModel):
    reply: str
    fields: dict[str, Any]


class SelectResponse(BaseModel):
    reply: str
    confirmed_doc_type: str | None


@router.post("/select", response_model=SelectResponse)
def chat_select(body: ChatRequest):
    """Help user choose a document type from the catalog."""
    messages = [m.model_dump() for m in body.messages]
    try:
        extraction = extract_fields(SELECT_PROMPT, SelectionExtraction, messages)
    except Exception as exc:
        logger.exception("LLM call failed")
        raise HTTPException(status_code=502, detail=str(exc))
    return SelectResponse(
        reply=extraction.reply,
        confirmed_doc_type=extraction.confirmed_doc_type,
    )


@router.post("/{doc_type}", response_model=ChatResponse)
def chat_extract(doc_type: str, body: ChatRequest):
    """Process chat messages and extract fields for a specific document type."""
    registry = get_registry()
    definition = registry.get(doc_type)
    if not definition:
        raise HTTPException(status_code=422, detail=f"Unknown document type: {doc_type}")

    messages = [m.model_dump() for m in body.messages]
    try:
        extraction = extract_fields(
            definition.system_prompt, definition.extraction_model, messages
        )
    except Exception as exc:
        logger.exception("LLM call failed")
        raise HTTPException(status_code=502, detail=str(exc))

    fields = extraction_to_field_dict(extraction)
    return ChatResponse(reply=extraction.reply, fields=fields)
