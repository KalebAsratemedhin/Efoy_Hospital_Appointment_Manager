from fastapi import Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from pydantic import ValidationError
from jose import JWTError
import logging
from typing import Union
from app.schemas.common import ErrorResponse

logger = logging.getLogger(__name__)

class AppException(Exception):
    """Base application exception"""
    def __init__(self, message: str, status_code: int = 500, detail: str = None):
        self.message = message
        self.status_code = status_code
        self.detail = detail
        super().__init__(self.message)

class ValidationException(AppException):
    """Validation exception"""
    def __init__(self, message: str = "Validation error", detail: str = None):
        super().__init__(message, status_code=400, detail=detail)

class NotFoundException(AppException):
    """Not found exception"""
    def __init__(self, message: str = "Resource not found", detail: str = None):
        super().__init__(message, status_code=404, detail=detail)

class UnauthorizedException(AppException):
    """Unauthorized exception"""
    def __init__(self, message: str = "Unauthorized", detail: str = None):
        super().__init__(message, status_code=401, detail=detail)

class ForbiddenException(AppException):
    """Forbidden exception"""
    def __init__(self, message: str = "Forbidden", detail: str = None):
        super().__init__(message, status_code=403, detail=detail)

class ConflictException(AppException):
    """Conflict exception"""
    def __init__(self, message: str = "Conflict", detail: str = None):
        super().__init__(message, status_code=409, detail=detail)

async def validation_exception_handler(request: Request, exc: Union[RequestValidationError, ValidationError]):
    """Handle Pydantic validation errors"""
    errors = []
    for error in exc.errors():
        field = " -> ".join(str(loc) for loc in error["loc"])
        errors.append(f"{field}: {error['msg']}")
    
    error_detail = "; ".join(errors)
    logger.warning(f"Validation error: {error_detail}")
    
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=ErrorResponse(
            error="Validation Error",
            detail=error_detail,
            status_code=422
        ).model_dump()
    )

async def app_exception_handler(request: Request, exc: AppException):
    """Handle custom application exceptions"""
    logger.error(f"Application error: {exc.message} - {exc.detail}")
    
    return JSONResponse(
        status_code=exc.status_code,
        content=ErrorResponse(
            error=exc.message,
            detail=exc.detail,
            status_code=exc.status_code
        ).model_dump()
    )

async def jwt_exception_handler(request: Request, exc: JWTError):
    """Handle JWT-related exceptions"""
    logger.warning(f"JWT error: {str(exc)}")
    
    return JSONResponse(
        status_code=status.HTTP_401_UNAUTHORIZED,
        content=ErrorResponse(
            error="Invalid token",
            detail="The provided token is invalid or expired",
            status_code=401
        ).model_dump()
    )

async def general_exception_handler(request: Request, exc: Exception):
    """Handle all other exceptions"""
    logger.error(f"Unhandled exception: {str(exc)}", exc_info=True)
    
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content=ErrorResponse(
            error="Internal server error",
            detail="An unexpected error occurred. Please try again later.",
            status_code=500
        ).model_dump()
    )

def setup_exception_handlers(app):
    """Setup all exception handlers for the FastAPI app"""
    app.add_exception_handler(RequestValidationError, validation_exception_handler)
    app.add_exception_handler(ValidationError, validation_exception_handler)
    app.add_exception_handler(AppException, app_exception_handler)
    app.add_exception_handler(JWTError, jwt_exception_handler)
    app.add_exception_handler(Exception, general_exception_handler) 