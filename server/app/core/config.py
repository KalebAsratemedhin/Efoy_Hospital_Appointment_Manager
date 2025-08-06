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
    
    # Email configuration
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = None
    SMTP_PASSWORD: str = None
    EMAIL_FROM: str = None

    class Config:
        env_file = ".env"

    @property
    def google_callback_url(self) -> str:
        """Get the Google OAuth callback URL"""
        if self.GOOGLE_CLIENT_CALLBACK_URL:
            return self.GOOGLE_CLIENT_CALLBACK_URL
        return f"{self.CLIENT_URL}/google-auth"

@lru_cache
def get_settings():
    return Settings() 