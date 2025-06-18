from beanie import Document, Link
from pydantic import Field
from typing import Optional
from datetime import datetime
from app.db.models.user import User

class Rating(Document):
    raterId: Link[User]
    doctorId: Link[User]
    value: float = Field(..., ge=0, le=5)
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Settings:
        name = "ratings" 