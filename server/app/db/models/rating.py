from app.db.models.base import BaseDocument
from beanie import Link
from pydantic import Field
from typing import Optional
from datetime import datetime
from app.db.models.user import User

class Rating(BaseDocument):
    raterId: Link[User]
    doctorId: Link[User]
    value: float = Field(..., ge=0, le=5)

    class Settings:
        name = "ratings"
        indexes = [
            "raterId",    # For user rating queries
            "doctorId",   # For doctor rating queries
            "value",      # For rating value queries
            "created_at", # For time-based queries
            [("doctorId", 1), ("raterId", 1)],  # Compound index for unique user-doctor ratings
            [("doctorId", 1), ("value", 1)],    # Compound index for doctor rating analysis
        ] 