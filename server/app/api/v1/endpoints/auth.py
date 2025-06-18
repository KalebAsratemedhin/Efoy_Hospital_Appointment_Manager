from fastapi import APIRouter, Depends, HTTPException, status, Request
from app.schemas.auth import AuthSignup, AuthLogin, AuthResponse
from app.services.auth_service import AuthService
from fastapi.responses import RedirectResponse, JSONResponse
from app.db.models.user import User

router = APIRouter()

@router.post('/signup', response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
async def signup(data: AuthSignup):
    return await AuthService.signup(data)

@router.post('/signin', response_model=AuthResponse)
async def signin(data: AuthLogin):
    return await AuthService.login(data)

@router.post('/signout')
async def signout():
    return await AuthService.logout()

# Google OAuth endpoints would require integration with an OAuth library, but we can stub them:
@router.get('/google/callback')
async def google_callback(request: Request):
    # In a real app, user info would come from OAuth middleware
    user: User = request.state.user  # This is a placeholder
    redirect_url = await AuthService.google_auth_success(user)
    return RedirectResponse(redirect_url)

@router.get('/auth/error')
async def auth_error():
    return JSONResponse(status_code=401, content={"error": "Google OAuth authentication failed"}) 