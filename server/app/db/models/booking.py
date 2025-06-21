from app.db.models.base import BaseDocument
from beanie import Link
from pydantic import Field
from typing import Optional
from datetime import date, datetime
from app.db.models.user import User

class Booking(BaseDocument):
    patientId: Link[User]
    doctorId: Link[User]
    appointmentDate: date
    time: str
    reason: str
    status: str = Field(default="pending")

    class Settings:
        name = "bookings" 