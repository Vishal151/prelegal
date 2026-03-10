"""Authentication endpoints."""

from fastapi import APIRouter, Depends, HTTPException, Response
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.auth_utils import create_token, hash_password, verify_password
from app.database import get_db
from app.dependencies import get_optional_user
from app.models import User

router = APIRouter(prefix="/api/auth", tags=["auth"])

COOKIE_NAME = "prelegal_session"
COOKIE_MAX_AGE = 30 * 24 * 60 * 60  # 30 days


class LoginRequest(BaseModel):
    email: str
    password: str


class SignupRequest(BaseModel):
    email: str
    password: str
    name: str = ""


class UserResponse(BaseModel):
    id: int
    email: str
    name: str


class MeResponse(BaseModel):
    user: UserResponse | None


def _set_session_cookie(response: Response, user: User) -> None:
    token = create_token(user.id)
    response.set_cookie(
        key=COOKIE_NAME,
        value=token,
        httponly=True,
        samesite="lax",
        max_age=COOKIE_MAX_AGE,
        path="/",
    )


@router.post("/signup", response_model=UserResponse)
def signup(body: SignupRequest, response: Response, db: Session = Depends(get_db)):
    """Create a new user account."""
    existing = db.query(User).filter(User.email == body.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = User(
        email=body.email,
        name=body.name,
        password_hash=hash_password(body.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    _set_session_cookie(response, user)
    return UserResponse(id=user.id, email=user.email, name=user.name)


@router.post("/login", response_model=UserResponse)
def login(body: LoginRequest, response: Response, db: Session = Depends(get_db)):
    """Authenticate and set session cookie."""
    user = db.query(User).filter(User.email == body.email).first()
    if not user or not verify_password(body.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    _set_session_cookie(response, user)
    return UserResponse(id=user.id, email=user.email, name=user.name)


@router.post("/logout")
def logout(response: Response):
    """Clear the session cookie."""
    response.delete_cookie(key=COOKIE_NAME, path="/")
    return {"message": "Logged out"}


@router.get("/me", response_model=MeResponse)
def me(user: User | None = Depends(get_optional_user)):
    """Return the current user or null."""
    if user:
        return MeResponse(user=UserResponse(id=user.id, email=user.email, name=user.name))
    return MeResponse(user=None)
