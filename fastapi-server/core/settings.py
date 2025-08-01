from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import Optional


class Settings(BaseSettings):
    # ======= Environment =======
    ENV: str

    # ======= Database =======
    DATABASE_URL: Optional[str] = None

    # ======= Mailjet =======
    MAILJET_API_KEY: str
    MAILJET_SECRET_KEY: str
    MAILJET_SENDER_EMAIL: str

    # ======= JWT =======
    SECRET_KEY: str
    JWT_ALGORITHM: str
    JWT_ACCESS_TOKEN_EXPIRES_MINUTES: int

    # ======= Email verification =======
    EMAIL_VERIFICATION_TOKEN_TTL_MINUTES: int

    # ======= Frontend client =======
    CLIENT_URL: str

    model_config = {"env_file": ".env"}


# This decorator caches the result of get_settings() so that if it's called multiple times
# (e.g., across many FastAPI endpoints), it doesn't repeatedly re-parse the .env file.
@lru_cache()
def get_settings():
    return Settings()  # type: ignore


settings = get_settings()
