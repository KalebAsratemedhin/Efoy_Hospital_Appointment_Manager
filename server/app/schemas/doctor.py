from pydantic import BaseModel, Field, field_validator
from typing import Optional
from datetime import datetime

class DoctorCreate(BaseModel):
    orgID: str
    speciality: str
    experience: str
    educationLevel: str

    @field_validator('orgID', 'speciality', 'experience', 'educationLevel')
    @classmethod
    def not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('Field cannot be empty')
        return v

class DoctorUpdate(BaseModel):
    orgID: Optional[str]
    speciality: Optional[str]
    experience: Optional[str]
    educationLevel: Optional[str]
    rating: Optional[float]

    @field_validator('orgID', 'speciality', 'experience', 'educationLevel')
    @classmethod
    def not_empty(cls, v):
        if v is not None and not v.strip():
            raise ValueError('Field cannot be empty')
        return v

class DoctorOut(BaseModel):
    id: str
    userId: str
    rating: float
    orgID: str
    speciality: str
    experience: str
    educationLevel: str
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    model_config = {"from_attributes": True} 