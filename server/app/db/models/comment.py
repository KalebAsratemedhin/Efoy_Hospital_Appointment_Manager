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