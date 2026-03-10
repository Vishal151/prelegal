from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session

from app.config import DATABASE_URL

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})


class Base(DeclarativeBase):
    pass


def get_db():
    with Session(engine) as session:
        yield session


def init_db():
    """Create all tables. Called on app startup."""
    from app import models  # noqa: F401

    Base.metadata.create_all(bind=engine)
