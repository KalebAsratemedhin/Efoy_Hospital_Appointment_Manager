from app.db.models.base import BaseDocument
from beanie import Link, Indexed
from typing import Optional
from datetime import datetime
from enum import Enum
from app.db.models.user import User
from app.db.models.booking import Booking

class PaymentStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    REFUNDED = "refunded"
    CANCELLED = "cancelled"

class PaymentMethod(str, Enum):
    CARD = "card"
    BANK_TRANSFER = "bank_transfer"
    WALLET = "wallet"

class Payment(BaseDocument):
    bookingId: Link[Booking]
    patientId: Link[User]
    doctorId: Link[User]
    amount: float
    currency: str = "USD"
    status: PaymentStatus = PaymentStatus.PENDING
    paymentMethod: PaymentMethod = PaymentMethod.CARD
    
    # Stripe specific fields
    stripeSessionId: Optional[str] = None
    stripePaymentIntentId: Optional[str] = None
    stripeCustomerId: Optional[str] = None
    
    # Metadata
    description: Optional[str] = None
    metadata: Optional[dict] = None
    
    # Timestamps (inherited from BaseDocument)
    paidAt: Optional[datetime] = None
    
    class Settings:
        name = "payments"
        indexes = [
            "bookingId",
            "patientId", 
            "doctorId",
            "status",
            "stripeSessionId",
            "stripePaymentIntentId"
        ]

    class Config:
        schema_extra = {
            "example": {
                "bookingId": "507f1f77bcf86cd799439011",
                "patientId": "507f1f77bcf86cd799439012",
                "doctorId": "507f1f77bcf86cd799439013",
                "amount": 150.00,
                "currency": "USD",
                "status": "pending",
                "paymentMethod": "card",
                "description": "Appointment consultation fee",
                "metadata": {
                    "appointment_type": "consultation",
                    "duration": "30 minutes"
                }
            }
        } 