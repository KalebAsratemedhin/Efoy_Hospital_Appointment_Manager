from app.db.models.base import BaseDocument
from beanie import Link
from pydantic import Field
from typing import Optional
from datetime import datetime
from app.db.models.user import User

class Doctor(BaseDocument):
    userId: Link[User]
    rating: float = Field(default=0, ge=0, le=5)
    orgID: str
    speciality: str
    experience: str
    educationLevel: str

    class Settings:
        name = "doctors" 