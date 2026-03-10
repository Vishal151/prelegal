"""FastAPI dependencies for auth."""

from fastapi import Cookie, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth_utils import decode_token
from app.database import get_db
from app.models import User


def get_current_user(
    prelegal_session: str | None = Cookie(None),
    db: Session = Depends(get_db),
) -> User:
    """Require a valid session cookie. Raises 401 if missing/invalid."""
    if not prelegal_session:
        raise HTTPException(status_code=401, detail="Not authenticated")
    user_id = decode_token(prelegal_session)
    if user_id is None:
        raise HTTPException(status_code=401, detail="Invalid or expired session")
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


def get_optional_user(
    prelegal_session: str | None = Cookie(None),
    db: Session = Depends(get_db),
) -> User | None:
    """Return the current user if authenticated, else None."""
    if not prelegal_session:
        return None
    user_id = decode_token(prelegal_session)
    if user_id is None:
        return None
    return db.get(User, user_id)
