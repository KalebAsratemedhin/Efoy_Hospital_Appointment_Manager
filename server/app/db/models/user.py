from app.db.models.base import BaseDocument
from pydantic import EmailStr, Field
from typing import Optional, Literal
from datetime import datetime

class User(BaseDocument):
    fullName: str
    email: EmailStr
    role: Literal['patient', 'doctor', 'admin'] = 'patient'
    password: Optional[str] = None
    phoneNumber: Optional[str] = None
    sex: Optional[Literal['male', 'female', 'other']] = None
    address: Optional[str] = None
    age: Optional[int] = Field(default=None, ge=0)
    profilePic: Optional[str] = None
    googleId: Optional[str] = None

    class Settings:
        name = "users"

    class Config:
        json_schema_extra = {
            "example": {
                "fullName": "John Doe",
                "email": "john@example.com",
                "role": "patient",
                "password": "hashedpassword",
                "phoneNumber": "1234567890",
                "sex": "male",
                "address": "123 Main St",
                "age": 30,
                "profilePic": "http://...",
                "googleId": "google-oauth-id"
            }
        } 