from fastapi import APIRouter,status, Request, HTTPException
from app.schemas.auth import AuthSignup, AuthLogin, AuthResponse
from app.services.auth_service import AuthService
from app.services.google_oauth_service import GoogleOAuthService
from fastapi.responses import RedirectResponse, JSONResponse
from app.db.models.user import User
from app.core.config import get_settings
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
    oauth_service = GoogleOAuthService()
    auth_url = oauth_service.get_authorization_url()
    return RedirectResponse(url=auth_url)

@router.get('/google/callback')
async def google_auth_callback(code: str, request: Request):
    try:
        oauth_service = GoogleOAuthService()
        
        # Get user data from Google
        google_data = await oauth_service.handle_callback(request)
        
        # Find or create user in database
        user = await GoogleOAuthService.find_or_create_user(google_data)
        
        # Create JWT token and redirect URL
        redirect_url = GoogleOAuthService.create_auth_response(user)
        
        # Redirect to frontend with authentication data
        return RedirectResponse(url=redirect_url)
        
    except Exception as e:
        # Redirect to error page if something goes wrong
        error_url = f"{get_settings().CLIENT_URL}/auth/error?message={str(e)}"
        return RedirectResponse(url=error_url)

@router.get('/auth/error')
async def auth_error(request: Request):
    """Handle OAuth errors"""
    message = request.query_params.get('message', 'Authentication failed')
    return JSONResponse(
        status_code=401, 
        content={"error": "Google OAuth authentication failed", "message": message}
    ) 