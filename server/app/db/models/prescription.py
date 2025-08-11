from app.db.models.base import BaseDocument
from beanie import Link
from pydantic import Field
from typing import Optional, List
from datetime import datetime
from app.db.models.user import User
from app.db.models.booking import Booking

class Prescription(BaseDocument):
    bookingId: Link[Booking]
    doctorId: Link[User]
    patientId: Link[User]
    medications: List[str]  # Simple list of medication strings
    diagnosis: Optional[str] = None
    notes: Optional[str] = None
    status: str = Field(default="active")  # active, expired, cancelled
    issueDate: datetime = Field(default_factory=datetime.now)
    expiryDate: Optional[datetime] = None
    digitalSignature: Optional[str] = None  # Base64 encoded signature image

    class Settings:
        name = "prescriptions"
        indexes = [
            "bookingId",  # For appointment-based queries
            "doctorId",   # For doctor's prescriptions
            "patientId",  # For patient's prescriptions
            "status",     # For status-based queries
            "issueDate",  # For date-based queries
            "expiryDate", # For expiry queries
        ] 