from app.db.models.base import BaseDocument
from beanie import Link
from pydantic import Field
from typing import Optional, Dict
from datetime import datetime
from app.db.models.user import User

class Doctor(BaseDocument):
    userId: Link[User]
    rating: float = Field(default=0, ge=0, le=5)
    orgID: str
    speciality: str
    experience: str
    educationLevel: str
    sessionPrice: float = Field(default=150.0, ge=0, description="Price per 20-minute session in ETB")
    workingHours: Dict[str, Dict[str, str]] = Field(
        default={
            "monday": {"start": "08:00", "end": "17:00"},
            "tuesday": {"start": "08:00", "end": "17:00"},
            "wednesday": {"start": "08:00", "end": "17:00"},
            "thursday": {"start": "08:00", "end": "17:00"},
            "friday": {"start": "08:00", "end": "17:00"},
            "saturday": {"start": "08:00", "end": "17:00"},
            "sunday": {"start": "08:00", "end": "17:00"}
        }
    )

    class Settings:
        name = "doctors"
        indexes = [
            "userId",     # For user-doctor relationship queries
            "speciality", # For specialty-based searches
            "rating",     # For rating-based sorting
            "orgID",      # For organization-based queries
            "created_at", # For time-based queries
            [("speciality", 1), ("rating", -1)],  # Compound index for specialty + rating queries
        ] 