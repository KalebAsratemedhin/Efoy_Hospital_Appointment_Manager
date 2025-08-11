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
    # Video call fields
    appointmentType: str = Field(default="in_person")  # "in_person" or "virtual"
    streamCallId: Optional[str] = None
    callStartedAt: Optional[datetime] = None
    callEndedAt: Optional[datetime] = None
    callDuration: Optional[int] = None  # in minutes

    class Settings:
        name = "bookings"
        indexes = [
            "patientId",  # For patient booking queries
            "doctorId",   # For doctor booking queries
            "appointmentDate",  # For date-based queries
            "status",     # For status-based queries
            "created_at", # For time-based queries
            "appointmentType",  # For video call queries
            [("doctorId", 1), ("appointmentDate", 1), ("time", 1)],  # Compound index for availability checks
            [("patientId", 1), ("appointmentDate", 1)],  # Compound index for patient date queries
        ] 