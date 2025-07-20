from app.db.models.base import BaseDocument
from beanie import Link
from pydantic import Field
from typing import Optional, Literal
from datetime import datetime
from app.db.models.user import User

class DoctorApplication(BaseDocument):
    userId: Link[User]
    orgID: str
    speciality: str
    experience: str
    educationLevel: str
    status: Literal['pending', 'approved', 'rejected'] = 'pending'
    appliedAt: Optional[datetime] = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "doctor_applications"
        indexes = [
            "userId",     # For user application queries
            "status",     # For status-based queries
            "speciality", # For specialty-based queries
            "appliedAt",  # For time-based queries
            "created_at", # For time-based queries
            [("status", 1), ("appliedAt", -1)],  # Compound index for status + time queries
        ] 