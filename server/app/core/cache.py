import asyncio
import time
from typing import Any, Optional, Dict
import logging
from functools import wraps

logger = logging.getLogger(__name__)

class Cache:
    def __init__(self, default_ttl: int = 300):  # 5 minutes default
        self._cache: Dict[str, Dict[str, Any]] = {}
        self._default_ttl = default_ttl
        self._lock = asyncio.Lock()
    
    async def get(self, key: str) -> Optional[Any]:
        """Get value from cache"""
        async with self._lock:
            if key in self._cache:
                item = self._cache[key]
                if time.time() < item['expires_at']:
                    logger.debug(f"Cache hit for key: {key}")
                    return item['value']
                else:
                    # Expired, remove it
                    del self._cache[key]
                    logger.debug(f"Cache expired for key: {key}")
            return None
    
    async def set(self, key: str, value: Any, ttl: Optional[int] = None) -> None:
        """Set value in cache with TTL"""
        async with self._lock:
            ttl = ttl or self._default_ttl
            self._cache[key] = {
                'value': value,
                'expires_at': time.time() + ttl
            }
            logger.debug(f"Cache set for key: {key} with TTL: {ttl}")
    
    async def delete(self, key: str) -> None:
        """Delete value from cache"""
        async with self._lock:
            if key in self._cache:
                del self._cache[key]
                logger.debug(f"Cache deleted for key: {key}")
    
    async def clear(self) -> None:
        """Clear all cache"""
        async with self._lock:
            self._cache.clear()
            logger.debug("Cache cleared")
    
    async def cleanup_expired(self) -> None:
        """Remove expired entries"""
        async with self._lock:
            current_time = time.time()
            expired_keys = [
                key for key, item in self._cache.items()
                if current_time >= item['expires_at']
            ]
            for key in expired_keys:
                del self._cache[key]
            if expired_keys:
                logger.debug(f"Cleaned up {len(expired_keys)} expired cache entries")

# Global cache instance
cache = Cache()

def cache_result(ttl: int = 300, key_prefix: str = ""):
    """Decorator to cache function results"""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Create cache key from function name and arguments
            cache_key = f"{key_prefix}:{func.__name__}:{hash(str(args) + str(sorted(kwargs.items())))}"
            
            # Try to get from cache first
            cached_result = await cache.get(cache_key)
            if cached_result is not None:
                return cached_result
            
            # Execute function and cache result
            result = await func(*args, **kwargs)
            await cache.set(cache_key, result, ttl)
            return result
        return wrapper
    return decorator

async def invalidate_cache_pattern(pattern: str) -> None:
    """Invalidate cache entries matching a pattern"""
    # This is a simple implementation - in production, use Redis with pattern matching
    logger.debug(f"Cache invalidation requested for pattern: {pattern}")
    # For now, we'll just clear all cache when pattern invalidation is requested
    await cache.clear() 