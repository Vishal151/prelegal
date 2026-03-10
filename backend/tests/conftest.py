"""Shared test fixtures."""

import pytest
from fastapi.testclient import TestClient

from app.database import Base, engine
import app.models  # noqa: F401 — register ORM models
from app.main import app


@pytest.fixture(autouse=True)
def reset_db():
    """Recreate all tables before each test."""
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)


@pytest.fixture
def auth_client():
    """TestClient with lifespan support."""
    with TestClient(app) as c:
        yield c
