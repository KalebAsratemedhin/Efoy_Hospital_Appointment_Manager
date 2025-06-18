from pydantic import BaseModel, Field, field_validator
from typing import Optional, Literal
from datetime import datetime

class DoctorApplicationCreate(BaseModel):
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

class DoctorApplicationUpdate(BaseModel):
    orgID: Optional[str]
    speciality: Optional[str]
    experience: Optional[str]
    educationLevel: Optional[str]
    status: Optional[Literal['pending', 'approved', 'rejected']]

    @field_validator('orgID', 'speciality', 'experience', 'educationLevel')
    @classmethod
    def not_empty(cls, v):
        if v is not None and not v.strip():
            raise ValueError('Field cannot be empty')
        return v

class DoctorApplicationOut(BaseModel):
    id: str
    userId: str
    orgID: str
    speciality: str
    experience: str
    educationLevel: str
    status: Literal['pending', 'approved', 'rejected']
    appliedAt: Optional[datetime]

    model_config = {"from_attributes": True} 