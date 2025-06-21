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