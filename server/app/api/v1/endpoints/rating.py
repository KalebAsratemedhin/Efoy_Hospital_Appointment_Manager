from fastapi import APIRouter, Depends, status
from typing import List, Optional
from app.schemas.rating import RatingCreate, RatingUpdate, RatingOut
from app.services.rating_service import RatingService
from app.core.security import get_current_user
from app.db.models.user import User

router = APIRouter()

@router.post('/', status_code=status.HTTP_201_CREATED)
async def create_rating(data: RatingCreate, current_user: User = Depends(get_current_user)):
    return await RatingService.create_rating(data, current_user)

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_rating(id: str, current_user: User = Depends(get_current_user)):
    return await RatingService.delete_rating(id, current_user)

@router.put('/{id}', status_code=status.HTTP_200_OK)
async def update_rating(id: str, data: RatingUpdate, current_user: User = Depends(get_current_user)):
    return await RatingService.update_rating(id, data, current_user)

@router.get('/favorites', status_code=status.HTTP_200_OK)
async def get_favorites(current_user: User = Depends(get_current_user)):
    return await RatingService.get_favorites(current_user) 

@router.get('/{doctorId}', response_model=Optional[RatingOut])
async def get_rating(doctorId: str, current_user: User = Depends(get_current_user)):
    return await RatingService.get_rating(doctorId, current_user)

@router.get('/doctor/{doctorId}/all', response_model=List[RatingOut])
async def get_doctor_ratings(doctorId: str):
    return await RatingService.get_doctor_ratings(doctorId)
