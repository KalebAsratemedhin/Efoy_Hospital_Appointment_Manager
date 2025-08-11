from pydantic import BaseModel, field_serializer
from typing import Generic, TypeVar, Optional, List, Any
from datetime import datetime, timezone

T = TypeVar('T')

class ErrorResponse(BaseModel):
    """Standard error response model"""
    error: str
    detail: Optional[str] = None
    status_code: int
    timestamp: datetime = datetime.now(timezone.utc)

    @field_serializer('timestamp')
    def serialize_timestamp(self, value):
        return value.isoformat() if value else None

class SuccessResponse(BaseModel, Generic[T]):
    """Standard success response model"""
    success: bool = True
    message: Optional[str] = None
    data: Optional[T] = None
    timestamp: datetime = datetime.now(timezone.utc)

    @field_serializer('timestamp')
    def serialize_timestamp(self, value):
        return value.isoformat() if value else None

class PaginatedResponse(BaseModel, Generic[T]):
    """Standard paginated response model"""
    items: List[T]
    total: int
    page: int
    limit: int
    total_pages: int
    has_next: bool
    has_prev: bool

class PaginationParams(BaseModel):
    """Standard pagination parameters"""
    page: int = 1
    limit: int = 10
    
    def validate(self):
        if self.page < 1:
            self.page = 1
        if self.limit < 1:
            self.limit = 10
        if self.limit > 100:
            self.limit = 100
        return self

class SearchParams(BaseModel):
    """Standard search parameters"""
    query: Optional[str] = None
    sort_by: Optional[str] = None
    sort_order: Optional[str] = "asc"  # asc or desc
    filters: Optional[dict] = None

class HealthCheckResponse(BaseModel):
    """Health check response model"""
    status: str
    timestamp: datetime = datetime.now(timezone.utc)
    version: str
    database: str
    uptime: float 