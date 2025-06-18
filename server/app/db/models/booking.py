from beanie import Document, Link
from pydantic import Field
from typing import Optional
from datetime import date, datetime
from app.db.models.user import User

class Booking(Document):
    patientId: Link[User]
    doctorId: Link[User]
    appointmentDate: date
    time: str
    reason: str
    status: str = Field(default="pending")
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Settings:
        name = "bookings" 