from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
import time
from collections import defaultdict
import asyncio
from typing import Dict, Tuple
import logging

logger = logging.getLogger(__name__)

class RateLimiter:
    def __init__(self, requests_per_minute: int = 60, requests_per_hour: int = 1000):
        self.requests_per_minute = requests_per_minute
        self.requests_per_hour = requests_per_hour
        self.minute_requests: Dict[str, list] = defaultdict(list)
        self.hour_requests: Dict[str, list] = defaultdict(list)
        self._lock = asyncio.Lock()
    
    def _get_client_ip(self, request: Request) -> str:
        """Extract client IP from request headers"""
        forwarded = request.headers.get("X-Forwarded-For")
        if forwarded:
            return forwarded.split(",")[0].strip()
        return request.client.host if request.client else "unknown"
    
    async def _cleanup_old_requests(self, client_ip: str):
        """Remove old requests outside the time windows"""
        current_time = time.time()
        
        # Clean minute requests (older than 60 seconds)
        self.minute_requests[client_ip] = [
            req_time for req_time in self.minute_requests[client_ip]
            if current_time - req_time < 60
        ]
        
        # Clean hour requests (older than 3600 seconds)
        self.hour_requests[client_ip] = [
            req_time for req_time in self.hour_requests[client_ip]
            if current_time - req_time < 3600
        ]
    
    async def check_rate_limit(self, request: Request) -> bool:
        """Check if request is within rate limits"""
        client_ip = self._get_client_ip(request)
        current_time = time.time()
        
        async with self._lock:
            await self._cleanup_old_requests(client_ip)
            
            # Check minute limit
            minute_count = len(self.minute_requests[client_ip])
            if minute_count >= self.requests_per_minute:
                logger.warning(f"Rate limit exceeded for IP {client_ip}: {minute_count} requests in last minute")
                return False
            
            # Check hour limit
            hour_count = len(self.hour_requests[client_ip])
            if hour_count >= self.requests_per_hour:
                logger.warning(f"Rate limit exceeded for IP {client_ip}: {hour_count} requests in last hour")
                return False
            
            # Add current request
            self.minute_requests[client_ip].append(current_time)
            self.hour_requests[client_ip].append(current_time)
            
            return True

# Global rate limiter instance
rate_limiter = RateLimiter()

async def rate_limit_middleware(request: Request, call_next):
    """Middleware to enforce rate limiting"""
    # Skip rate limiting for health checks and static files
    if request.url.path in ["/health", "/docs", "/openapi.json"]:
        return await call_next(request)
    
    if not await rate_limiter.check_rate_limit(request):
        return JSONResponse(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            content={
                "error": "Rate limit exceeded",
                "detail": "Too many requests. Please try again later.",
                "retry_after": 60
            },
            headers={"Retry-After": "60"}
        )
    
    response = await call_next(request)
    return response 