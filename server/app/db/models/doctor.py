from beanie import Document, Link
from pydantic import Field
from typing import Optional
from datetime import datetime
from app.db.models.user import User

class Doctor(Document):
    userId: Link[User]
    rating: float = Field(default=0, ge=0, le=5)
    orgID: str
    speciality: str
    experience: str
    educationLevel: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Settings:
        name = "doctors" 