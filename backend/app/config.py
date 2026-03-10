import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
STATIC_DIR = BASE_DIR / "static"
DATABASE_URL = f"sqlite:///{BASE_DIR / 'prelegal.db'}"

load_dotenv(BASE_DIR.parent / ".env")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret-change-in-prod")
JWT_ALGORITHM = "HS256"
JWT_EXPIRY_DAYS = 30
