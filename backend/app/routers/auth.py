"""Authentication endpoints (placeholder stubs)."""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/api/auth", tags=["auth"])


class LoginRequest(BaseModel):
    email: str
    password: str


class SignupRequest(BaseModel):
    email: str
    password: str
    name: str


class AuthResponse(BaseModel):
    message: str
    email: str


@router.post("/login", response_model=AuthResponse)
def login(body: LoginRequest):
    """Placeholder login — accepts any credentials."""
    return AuthResponse(message="Login successful", email=body.email)


@router.post("/signup", response_model=AuthResponse)
def signup(body: SignupRequest):
    """Placeholder signup — accepts any input."""
    return AuthResponse(message="Signup successful", email=body.email)
