"""Chat endpoint for AI-assisted NDA field extraction."""

import logging
from typing import Any, Literal

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.ai_service import extract_nda_fields, extraction_to_field_dict

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


@router.post("/nda", response_model=ChatResponse)
def chat_nda(body: ChatRequest):
    """Process chat messages and extract NDA fields."""
    messages = [m.model_dump() for m in body.messages]
    try:
        extraction = extract_nda_fields(messages)
    except Exception as exc:
        logger.exception("LLM call failed")
        raise HTTPException(status_code=502, detail=str(exc))
    fields = extraction_to_field_dict(extraction)
    return ChatResponse(reply=extraction.reply, fields=fields)
