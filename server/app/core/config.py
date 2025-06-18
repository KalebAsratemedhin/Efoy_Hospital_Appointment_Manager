from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    MONGO_URI: str
    JWT_SECRET: str
    CLIENT_URL: str
    CLOUDINARY_CLOUD_NAME: str
    CLOUDINARY_API_KEY: str
    CLOUDINARY_API_SECRET: str
    GOOGLE_CLIENT_ID: str = None
    GOOGLE_CLIENT_SECRET: str = None
    GOOGLE_CLIENT_CALLBACK_URL: str = None
    PORT: int = 8000

    class Config:
        env_file = ".env"

@lru_cache
def get_settings():
    return Settings() 