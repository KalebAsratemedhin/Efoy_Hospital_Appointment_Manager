from beanie import Document, Link
from pydantic import Field
from typing import Optional
from datetime import datetime
from app.db.models.user import User

class Comment(Document):
    commenterId: Link[User]
    doctorId: Link[User]
    content: str = Field(..., min_length=1)
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Settings:
        name = "comments" 