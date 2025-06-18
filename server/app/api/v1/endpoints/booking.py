from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List
from app.schemas.booking import BookingCreate, BookingUpdate, BookingOut, BookingPaginatedResponse
from app.db.models.user import User
from app.core.security import get_current_user
from datetime import date
from app.services.booking_service import BookingService

router = APIRouter()

@router.get('/', response_model=BookingPaginatedResponse)
async def find_all_user_bookings(
    current_user: User = Depends(get_current_user),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1)
):
    result = await BookingService.find_all_user_bookings(current_user, page, limit)
    return result

@router.get('/recent', response_model=BookingOut)
async def find_recent_booking(current_user: User = Depends(get_current_user)):
    return await BookingService.find_recent_booking(current_user)

@router.get('/doctor/{doctorId}', response_model=List[int])
async def doctor_summary(doctorId: str, current_user: User = Depends(get_current_user)):
    return await BookingService.doctor_summary(doctorId)

@router.get('/patient/{patientId}', response_model=List[int])
async def patient_summary(patientId: str, current_user: User = Depends(get_current_user)):
    return await BookingService.patient_summary(patientId) 


@router.put('/{id}/finish', response_model=BookingOut)
async def mark_booking_finished(id: str, current_user: User = Depends(get_current_user)):
    print(f"Endpoint hit: mark_booking_finished with id: {id}")
    return await BookingService.mark_booking_finished(id, current_user)

@router.get('/{id}', response_model=BookingOut)
async def find_one_booking(id: str, current_user: User = Depends(get_current_user)):
    return await BookingService.find_one_booking(id)

@router.post('/', response_model=BookingOut, status_code=status.HTTP_201_CREATED)
async def create_booking(booking_in: BookingCreate, current_user: User = Depends(get_current_user)):
    return await BookingService.create_booking(booking_in, current_user)

@router.put('/{id}', response_model=BookingOut)
async def update_booking(id: str, booking_update: BookingUpdate, current_user: User = Depends(get_current_user)):
    return await BookingService.update_booking(id, booking_update)

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_booking(id: str, current_user: User = Depends(get_current_user)):
    await BookingService.delete_booking(id)
    return
