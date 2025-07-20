from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional

class AuthSignup(BaseModel):
    fullName: str = Field(..., min_length=2)
    email: EmailStr
    password: str = Field(..., min_length=6)
    phoneNumber: Optional[str]
    role: str = Field(default="patient", pattern='^(patient|doctor|admin)$')

class AuthLogin(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)

class AuthResponse(BaseModel):
    accessToken: str
    id: str
    role: str
    model_config = {"from_attributes": True} 