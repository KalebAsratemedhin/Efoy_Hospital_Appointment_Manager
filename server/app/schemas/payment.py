from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime
from enum import Enum

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

# Request schemas
class CreatePaymentIntentRequest(BaseModel):
    bookingId: str = Field(..., description="ID of the booking")
    amount: float = Field(..., gt=0, description="Payment amount")
    currency: str = Field(default="USD", description="Payment currency")
    description: Optional[str] = Field(None, description="Payment description")
    metadata: Optional[Dict[str, Any]] = Field(None, description="Additional metadata")

class CreateCheckoutSessionRequest(BaseModel):
    bookingId: str = Field(..., description="ID of the booking")
    amount: float = Field(..., gt=0, description="Payment amount")
    currency: str = Field(default="USD", description="Payment currency")
    description: Optional[str] = Field(None, description="Payment description")
    metadata: Optional[Dict[str, Any]] = Field(None, description="Additional metadata")
    successUrl: Optional[str] = Field(None, description="Success redirect URL")
    cancelUrl: Optional[str] = Field(None, description="Cancel redirect URL")

class ConfirmPaymentRequest(BaseModel):
    paymentIntentId: str = Field(..., description="Stripe payment intent ID")

class RefundPaymentRequest(BaseModel):
    reason: Optional[str] = Field(None, description="Reason for refund")
    amount: Optional[float] = Field(None, gt=0, description="Amount to refund (partial refund)")

# Response schemas
class PaymentIntentResponse(BaseModel):
    id: str
    amount: float
    currency: str
    status: str
    clientSecret: str
    created: datetime

class CheckoutSessionResponse(BaseModel):
    sessionId: str
    url: Optional[str] = None
    expiresAt: Optional[datetime] = None

class PaymentStatusResponse(BaseModel):
    id: str
    bookingId: str
    amount: float
    currency: str
    status: PaymentStatus
    stripeSessionId: Optional[str] = None
    stripePaymentIntentId: Optional[str] = None
    createdAt: datetime
    paidAt: Optional[datetime] = None

class RefundResponse(BaseModel):
    id: str
    amount: float
    currency: str
    status: str
    reason: Optional[str] = None
    created: datetime

# Webhook schemas
class StripeWebhookEvent(BaseModel):
    id: str
    type: str
    data: Dict[str, Any]
    created: datetime

class PaymentSuccessWebhook(BaseModel):
    sessionId: str
    bookingId: str
    amount: float
    currency: str
    customerId: Optional[str] = None
    paymentIntentId: Optional[str] = None 