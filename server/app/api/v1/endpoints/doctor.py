from fastapi import APIRouter, Depends, Query, HTTPException, status
from typing import Optional, Dict, List
from app.schemas.doctor import DoctorCreate, DoctorUpdate, DoctorOut
from app.services.doctor_service import DoctorService
from app.core.security import get_current_user, admin_required
from app.db.models.user import User
from app.schemas.user import UserOut
from datetime import date
from app.services.booking_service import BookingService

router = APIRouter()

    
@router.get('/')
async def find_all_doctors(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1),
    search: Optional[str] = None
):
    result = await DoctorService.find_all_doctors(page, limit, search)
    return result

@router.get('/available-slots', response_model=List[str])
async def available_slots(
    doctor: str = Query(...),
    date: date = Query(...),
    current_user: User = Depends(get_current_user)
):
    return await BookingService.find_available_time_slots(doctor, date) 
    
@router.get('/{id}', response_model=DoctorOut)
async def find_one_doctor(id: str):
    return await DoctorService.find_one_doctor(id)

@router.get('/user/{user_id}', response_model=DoctorOut)
async def find_doctor_by_user_id(user_id: str, current_user: User = Depends(get_current_user)):
    """Get doctor profile by user ID (for profile editing)"""
    # Ensure the current user is requesting their own profile
    if str(current_user.id) != user_id:
        raise HTTPException(status_code=403, detail="Can only access your own profile")
    return await DoctorService.find_doctor_by_user_id(user_id)

@router.put('/{id}', response_model=DoctorOut)
async def update_doctor(id: str, update: DoctorUpdate, current_user: User = Depends(get_current_user)):
    return await DoctorService.update_doctor(id, update, current_user)

@router.put('/{id}/working-hours', response_model=DoctorOut)
async def update_working_hours(id: str, working_hours: Dict[str, Dict[str, str]], current_user: User = Depends(get_current_user)):
    return await DoctorService.update_working_hours(id, working_hours, current_user) 

@router.post('/admin-create', response_model=DoctorOut, status_code=status.HTTP_201_CREATED)
async def admin_create_doctor(
    data: DoctorCreate,
    current_user: User = Depends(admin_required)
):
    """
    Admin creates a doctor. All fields in a flat DoctorCreate schema.
    """
    return await DoctorService.admin_create_doctor(data) 
