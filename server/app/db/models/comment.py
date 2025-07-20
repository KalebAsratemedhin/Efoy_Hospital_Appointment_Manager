from app.db.models.base import BaseDocument
from beanie import Link
from pydantic import Field
from typing import Optional
from datetime import datetime
from app.db.models.user import User

class Comment(BaseDocument):
    commenterId: Link[User]
    doctorId: Link[User]
    content: str = Field(..., min_length=1)

    class Settings:
        name = "comments"
        indexes = [
            "commenterId", # For user comment queries
            "doctorId",    # For doctor comment queries
            "created_at",  # For time-based queries
            [("doctorId", 1), ("created_at", -1)],  # Compound index for doctor comments sorted by date
        ] 