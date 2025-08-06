from fastapi import APIRouter,status, Request, HTTPException
from app.schemas.auth import AuthSignup, AuthLogin, AuthResponse
from app.services.auth_service import AuthService
from app.services.google_oauth_service import GoogleOAuthService
from fastapi.responses import RedirectResponse, JSONResponse
from app.db.models.user import User
from pydantic import BaseModel

router = APIRouter()

class EmailRequest(BaseModel):
    email: str

@router.post('/signup', response_model=dict, status_code=status.HTTP_201_CREATED)
async def signup(data: AuthSignup):
    return await AuthService.signup(data)

@router.post('/signin', response_model=AuthResponse, status_code=status.HTTP_200_OK)
async def signin(data: AuthLogin):
    return await AuthService.login(data)

@router.post('/signout', status_code=status.HTTP_200_OK)
async def signout():
    return await AuthService.logout()

@router.get('/verify-email', response_model=AuthResponse, status_code=status.HTTP_200_OK)
async def verify_email(token: str):
    """Verify user email with token"""
    return await AuthService.verify_email(token)

@router.post('/resend-verification', status_code=status.HTTP_200_OK)
async def resend_verification(data: EmailRequest):
    """Resend verification email"""
    return await AuthService.resend_verification_email(data.email)

@router.get('/google')
async def google_auth():
    return await GoogleOAuthService.get_authorization_url()

@router.get('/google/callback')
async def google_auth_callback(code: str):
    return await GoogleOAuthService.handle_callback(code)

@router.get('/auth/error')
async def auth_error(request: Request):
    """Handle OAuth errors"""
    message = request.query_params.get('message', 'Authentication failed')
    return JSONResponse(
        status_code=401, 
        content={"error": "Google OAuth authentication failed", "message": message}
    ) 