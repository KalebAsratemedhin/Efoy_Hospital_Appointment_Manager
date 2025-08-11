import jwt
import time
from datetime import datetime, timedelta
from typing import Optional
from fastapi import HTTPException, status
from app.core.config import get_settings
from app.db.models.booking import Booking

settings = get_settings()

class StreamVideoService:
    @staticmethod
    def generate_user_token(user_id: str, user_name: str, user_role: str) -> str:
        """Generate a Stream Video user token for authentication"""
        if not settings.STREAM_API_KEY or not settings.STREAM_API_SECRET:
            raise HTTPException(
                status_code=500,
                detail="Stream Video API credentials not configured"
            )
        
        # Token expiration (24 hours from now)
        exp = int(time.time()) + (24 * 60 * 60)
        
        # Create token payload
        payload = {
            "user_id": user_id,
            "exp": exp,
            "iat": int(time.time()),
            "nbf": int(time.time())
        }
        
        try:
            # Generate JWT token using Stream's secret
            token = jwt.encode(
                payload,
                settings.STREAM_API_SECRET,
                algorithm="HS256"
            )
            return token
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Failed to generate Stream token: {str(e)}"
            )
    
    @staticmethod
    def generate_call_id(booking_id: str, patient_id: str, doctor_id: str) -> str:
        """Generate a unique call ID for a booking that fits Stream's 64 character limit"""
        # Use a shorter format: b_{booking_id}_{timestamp}
        # This ensures uniqueness while staying under 64 characters
        timestamp = int(time.time())
        print("timestamp", timestamp)
        return f"b_{booking_id}_{timestamp}"
    
    @staticmethod
    def validate_call_permission(user_id: str, booking: Booking) -> bool:
        return (
            user_id == booking.patientId.id or 
            user_id == booking.doctorId.id
        )
        
    @staticmethod
    def is_call_time(booking_date: str, booking_time: str) -> bool:
        """Check if it's time for the video call (within 15 minutes before and after)"""
        try:
            # Parse booking date and time
            booking_datetime = datetime.strptime(f"{booking_date} {booking_time}", "%Y-%m-%d %H:%M")
            
            # Get current time
            now = datetime.now()
            
            # Allow joining 15 minutes before and after the scheduled time
            start_time = booking_datetime - timedelta(minutes=15)
            end_time = booking_datetime + timedelta(minutes=15)
            
            return start_time <= now <= end_time
        except Exception:
            return False 