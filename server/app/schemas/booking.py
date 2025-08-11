from pydantic import BaseModel, Field, field_validator
from typing import Optional, List
from datetime import date, datetime
import re
from app.schemas.common import PaginatedResponse
from app.schemas.user import UserOut
from app.schemas.doctor import DoctorData, DoctorOut

class BookingCreate(BaseModel):
    doctorId: str
    appointmentDate: date
    time: str
    reason: str
    appointmentType: str = "in_person"  # "in_person" or "virtual"

    @field_validator('appointmentDate')
    @classmethod
    def date_not_in_past(cls, v):
        if v < date.today():
            raise ValueError('Appointment date cannot be in the past.')
        return v

    @field_validator('time')
    @classmethod
    def valid_time_format(cls, v):
        if not re.match(r'^([01]\d|2[0-3]):([0-5]\d)$', v):
            raise ValueError('Invalid time format. Use HH:MM.')
        return v

    @field_validator('appointmentType')
    @classmethod
    def valid_appointment_type(cls, v):
        if v not in ["in_person", "virtual"]:
            raise ValueError('Appointment type must be either "in_person" or "virtual".')
        return v

class BookingUpdate(BaseModel):
    appointmentDate: Optional[date]
    time: Optional[str]
    reason: Optional[str]
    appointmentType: Optional[str]

    @field_validator('appointmentDate')
    @classmethod
    def date_not_in_past(cls, v):
        if v and v < date.today():
            raise ValueError('Appointment date cannot be in the past.')
        return v

    @field_validator('time')
    @classmethod
    def valid_time_format(cls, v):
        if v and not re.match(r'^([01]\d|2[0-3]):([0-5]\d)$', v):
            raise ValueError('Invalid time format. Use HH:MM.')
        return v

    @field_validator('appointmentType')
    @classmethod
    def valid_appointment_type(cls, v):
        if v and v not in ["in_person", "virtual"]:
            raise ValueError('Appointment type must be either "in_person" or "virtual".')
        return v

class BookingOut(BaseModel):
    id: str
    patientId: UserOut
    doctorId: UserOut
    doctorData: DoctorData
    appointmentDate: date
    time: str
    reason: str
    status: str
    appointmentType: str
    streamCallId: Optional[str]
    callStartedAt: Optional[datetime]
    callEndedAt: Optional[datetime]
    callDuration: Optional[int]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]
    model_config = {"from_attributes": True}

class BookingPaginatedResponse(PaginatedResponse[BookingOut]):
    """Standardized paginated response for bookings"""
    pass 