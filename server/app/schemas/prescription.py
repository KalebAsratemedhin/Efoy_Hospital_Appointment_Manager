from pydantic import BaseModel, Field, field_validator
from typing import Optional, List, Union
from datetime import datetime
from app.schemas.common import PaginatedResponse
from app.schemas.user import UserOut

class PrescriptionCreate(BaseModel):
    bookingId: str
    medications: List[str] = Field(..., min_items=1)
    diagnosis: Optional[str] = None
    notes: Optional[str] = None
    expiryDate: Optional[Union[str, datetime]] = None
    digitalSignature: Optional[str] = None  # Base64 encoded signature

    @field_validator('medications')
    @classmethod
    def validate_medications(cls, v):
        if not v:
            raise ValueError('At least one medication is required.')
        return v

    @field_validator('expiryDate')
    @classmethod
    def validate_expiry_date(cls, v):
        if v is None or v == "":
            return None
        if isinstance(v, str):
            try:
                return datetime.fromisoformat(v)
            except ValueError:
                raise ValueError('Invalid date format. Use YYYY-MM-DD format.')
        return v

class PrescriptionUpdate(BaseModel):
    medications: Optional[List[str]] = Field(None, min_items=1)
    diagnosis: Optional[str] = None
    notes: Optional[str] = None
    expiryDate: Optional[Union[str, datetime]] = None
    status: Optional[str] = Field(None, pattern="^(active|expired|cancelled)$")
    digitalSignature: Optional[str] = None

    @field_validator('medications')
    @classmethod
    def validate_medications(cls, v):
        if v is not None and not v:
            raise ValueError('At least one medication is required.')
        return v
    
    @field_validator('expiryDate')
    @classmethod
    def validate_expiry_date(cls, v):
        if v is None or v == "":
            return None
        if isinstance(v, str):
            try:
                return datetime.fromisoformat(v)
            except ValueError:
                raise ValueError('Invalid date format. Use YYYY-MM-DD format.')
        return v

class PrescriptionOut(BaseModel):
    id: str
    bookingId: str # Expected string
    doctorId: UserOut
    patientId: UserOut
    medications: List[str]
    diagnosis: Optional[str]
    notes: Optional[str]
    status: str
    issueDate: datetime
    expiryDate: Optional[datetime]
    digitalSignature: Optional[str]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]
    
    model_config = {"from_attributes": True}

class PrescriptionPaginatedResponse(PaginatedResponse[PrescriptionOut]):
    """Standardized paginated response for prescriptions"""
    pass 