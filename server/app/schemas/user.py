from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Literal
from datetime import datetime
from beanie import PydanticObjectId

class UserBase(BaseModel):
    fullName: str
    email: EmailStr
    role: Literal['patient', 'doctor', 'admin'] = 'patient'
    phoneNumber: Optional[str] = None
    sex: Optional[Literal['male', 'female', 'other']] = None
    address: Optional[str] = None
    age: Optional[int] = Field(default=None, ge=0)
    profilePic: Optional[str] = None
    googleId: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    fullName: Optional[str] = None
    phoneNumber: Optional[str] = None
    sex: Optional[Literal['male', 'female', 'other']] = None
    address: Optional[str] = None
    age: Optional[int] = Field(default=None, ge=0)
    profilePic: Optional[str] = None

class UserOut(UserBase):
    id: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    model_config = {
        "from_attributes": True,
        "json_encoders": {PydanticObjectId: str}
    } 