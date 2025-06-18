from pydantic import BaseModel, Field, field_validator, EmailStr
from typing import Optional, Dict, List
from datetime import datetime
import re
from app.schemas.common import PaginatedResponse
from app.schemas.user import UserOut

class DoctorCreate(BaseModel):
    orgID: str
    speciality: str
    experience: str
    educationLevel: str
    workingHours: Optional[Dict[str, Dict[str, str]]] = None
    fullName: str
    email: EmailStr
    phoneNumber: Optional[str] = None
    password: str

    @field_validator('orgID', 'speciality', 'experience', 'educationLevel')
    @classmethod
    def not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('Field cannot be empty')
        return v

    @field_validator('workingHours')
    @classmethod
    def validate_working_hours(cls, v):
        if v is not None:
            days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
            for day, hours in v.items():
                if day not in days:
                    raise ValueError(f'Invalid day: {day}')
                if "start" not in hours or "end" not in hours:
                    raise ValueError(f'Missing start or end time for {day}')
                if not re.match(r'^([01]\d|2[0-3]):([0-5]\d)$', hours["start"]):
                    raise ValueError(f'Invalid start time format for {day}. Use HH:MM.')
                if not re.match(r'^([01]\d|2[0-3]):([0-5]\d)$', hours["end"]):
                    raise ValueError(f'Invalid end time format for {day}. Use HH:MM.')
                if hours["start"] >= hours["end"]:
                    raise ValueError(f'Start time must be before end time for {day}')
        return v

class DoctorUpdate(BaseModel):
    orgID: Optional[str] = None
    speciality: Optional[str] = None
    experience: Optional[str] = None
    educationLevel: Optional[str] = None
    rating: Optional[float] = None
    workingHours: Optional[Dict[str, Dict[str, str]]] = None

    @field_validator('orgID', 'speciality', 'experience', 'educationLevel')
    @classmethod
    def not_empty(cls, v):
        if v is not None and not v.strip():
            raise ValueError('Field cannot be empty')
        return v

    @field_validator('workingHours')
    @classmethod
    def validate_working_hours(cls, v):
        if v is not None:
            days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
            for day, hours in v.items():
                if day not in days:
                    raise ValueError(f'Invalid day: {day}')
                if "start" not in hours or "end" not in hours:
                    raise ValueError(f'Missing start or end time for {day}')
                if not re.match(r'^([01]\d|2[0-3]):([0-5]\d)$', hours["start"]):
                    raise ValueError(f'Invalid start time format for {day}. Use HH:MM.')
                if not re.match(r'^([01]\d|2[0-3]):([0-5]\d)$', hours["end"]):
                    raise ValueError(f'Invalid end time format for {day}. Use HH:MM.')
                if hours["start"] >= hours["end"]:
                    raise ValueError(f'Start time must be before end time for {day}')
        return v
class DoctorData(BaseModel):
    id: str
    rating: float = 0.0
    orgID: str
    speciality: str
    experience: str
    educationLevel: str
    workingHours: Dict[str, Dict[str, str]]
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    model_config = {"from_attributes": True}

class DoctorOut(BaseModel):
    id: str
    userId: UserOut
    rating: float = 0.0
    orgID: str
    speciality: str
    experience: str
    educationLevel: str
    workingHours: Dict[str, Dict[str, str]]
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    model_config = {"from_attributes": True}


class DoctorPaginatedResponse(PaginatedResponse[DoctorOut]):
    """Standardized paginated response for doctors"""
    pass

class DoctorSearchResponse(BaseModel):
    """Response for doctor search with pagination"""
    doctors: List[DoctorOut]
    total: int
    page: int
    limit: int
    total_pages: int
    has_next: bool
    has_prev: bool
    search_query: Optional[str] = None 