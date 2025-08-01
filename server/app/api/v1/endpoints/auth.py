from fastapi import APIRouter,status, Request, HTTPException
from app.schemas.auth import AuthSignup, AuthLogin, AuthResponse
from app.services.auth_service import AuthService
from app.services.google_oauth_service import GoogleOAuthService
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

# Google OAuth endpoints
@router.get('/google')
async def google_auth(request: Request):
    """Initiate Google OAuth flow"""
    try:
        google_service = GoogleOAuthService()
        auth_url = google_service.get_authorization_url()
        return RedirectResponse(url=auth_url)
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Google OAuth not configured")

@router.get('/google/callback')
async def google_callback(request: Request):
    """Handle Google OAuth callback"""
    try:
        google_service = GoogleOAuthService()
        
        # Get user data from Google
        google_data = await google_service.handle_callback(request)
        
        # Find or create user
        user = await GoogleOAuthService.find_or_create_user(google_data)
        
        # Create auth response
        redirect_url = GoogleOAuthService.create_auth_response(user)
        
        return RedirectResponse(url=redirect_url)
    except ValueError as e:
        error_url = f"{request.base_url}auth/error?message={str(e)}"
        return RedirectResponse(url=error_url)
    except Exception as e:
        error_url = f"{request.base_url}auth/error?message=Authentication failed"
        return RedirectResponse(url=error_url)

@router.get('/auth/error')
async def auth_error(request: Request):
    """Handle OAuth errors"""
    message = request.query_params.get('message', 'Authentication failed')
    return JSONResponse(
        status_code=401, 
        content={"error": "Google OAuth authentication failed", "message": message}
    ) 