from beanie import Document
from datetime import datetime
from typing import Optional

class BaseDocument(Document):
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    async def insert(self, *args, **kwargs):
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()
        return await super().insert(*args, **kwargs)

    async def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()
        return await super().save(*args, **kwargs) 