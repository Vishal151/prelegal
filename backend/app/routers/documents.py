"""Document persistence endpoints."""

import json
from datetime import datetime, timezone
from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.models import SavedDocument, User

router = APIRouter(prefix="/api/documents", tags=["documents"])


class SaveDocumentRequest(BaseModel):
    doc_type: str
    fields: dict[str, Any]
    chat: list[dict[str, str]]


class DocumentResponse(BaseModel):
    id: int
    doc_type: str
    fields: dict[str, Any]
    chat: list[dict[str, str]]
    updated_at: str


class DocumentListItem(BaseModel):
    id: int
    doc_type: str
    updated_at: str


def _to_response(doc: SavedDocument) -> DocumentResponse:
    return DocumentResponse(
        id=doc.id,
        doc_type=doc.doc_type,
        fields=json.loads(doc.fields_json),
        chat=json.loads(doc.chat_json),
        updated_at=doc.updated_at.isoformat(),
    )


@router.get("", response_model=list[DocumentListItem])
def list_documents(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """List all saved documents for the current user."""
    docs = (
        db.query(SavedDocument)
        .filter(SavedDocument.user_id == user.id)
        .order_by(SavedDocument.updated_at.desc())
        .all()
    )
    return [
        DocumentListItem(id=d.id, doc_type=d.doc_type, updated_at=d.updated_at.isoformat())
        for d in docs
    ]


@router.post("", response_model=DocumentResponse)
def save_document(
    body: SaveDocumentRequest,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Save or update a document. Upserts by (user_id, doc_type)."""
    doc = (
        db.query(SavedDocument)
        .filter(SavedDocument.user_id == user.id, SavedDocument.doc_type == body.doc_type)
        .first()
    )
    fields_json = json.dumps(body.fields)
    chat_json = json.dumps(body.chat)
    now = datetime.now(timezone.utc)

    if doc:
        doc.fields_json = fields_json
        doc.chat_json = chat_json
        doc.updated_at = now
    else:
        doc = SavedDocument(
            user_id=user.id,
            doc_type=body.doc_type,
            fields_json=fields_json,
            chat_json=chat_json,
        )
        db.add(doc)

    db.commit()
    db.refresh(doc)
    return _to_response(doc)


@router.get("/{doc_type}", response_model=DocumentResponse)
def load_document(
    doc_type: str,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Load the saved document for a specific doc type."""
    doc = (
        db.query(SavedDocument)
        .filter(SavedDocument.user_id == user.id, SavedDocument.doc_type == doc_type)
        .first()
    )
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return _to_response(doc)


@router.delete("/{document_id}")
def delete_document(
    document_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Delete a saved document."""
    doc = db.get(SavedDocument, document_id)
    if not doc or doc.user_id != user.id:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(doc)
    db.commit()
    return {"message": "Deleted"}
