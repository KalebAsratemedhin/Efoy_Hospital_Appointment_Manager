from app.db.models.user import User
from app.schemas.auth import AuthSignup, AuthLogin, AuthResponse
from fastapi import HTTPException, status
from jose import jwt
from app.core.config import get_settings
from beanie import PydanticObjectId
from typing import Optional
from app.core.security import pwd_context

settings = get_settings()

class AuthService:
    @staticmethod
    async def signup(data: AuthSignup) -> AuthResponse:
        # Check for duplicate
        existing = await User.find_one({"email": data.email})
        if existing:
            raise HTTPException(status_code=409, detail="Duplicate account found.")
        hashed_password = pwd_context.hash(data.password)
        user = User(
            fullName=data.fullName,
            email=data.email,
            password=hashed_password,
            phoneNumber=data.phoneNumber,
            role=data.role
        )
        await user.insert()
        payload = {"id": str(user.id), "role": user.role}
        token = jwt.encode(payload, settings.JWT_SECRET, algorithm="HS256")
        return AuthResponse(accessToken=token, id=str(user.id), role=user.role)

    @staticmethod
    async def login(data: AuthLogin) -> AuthResponse:
        user = await User.find_one({"email": data.email})
        if not user or not user.password or not pwd_context.verify(data.password, user.password):
            raise HTTPException(status_code=400, detail="Invalid email or password.")
        payload = {"id": str(user.id), "role": user.role}
        token = jwt.encode(payload, settings.JWT_SECRET, algorithm="HS256")
        return AuthResponse(accessToken=token, id=str(user.id), role=user.role)

    @staticmethod
    async def logout() -> dict:
        # Stateless JWT: just return success
        return {"success": True, "message": "User logged out successfully"}

    @staticmethod
    async def google_auth_success(user: User) -> str:
        payload = {"id": str(user.id), "role": user.role}
        token = jwt.encode(payload, settings.JWT_SECRET, algorithm="HS256")
        redirect_url = f"{settings.CLIENT_URL}/google-auth?id={user.id}&role={user.role}&token={token}"
        return redirect_url 