from fastapi import APIRouter, Depends, Query
from typing import Optional, Dict, List
from app.schemas.doctor import DoctorCreate, DoctorUpdate, DoctorOut
from app.services.doctor_service import DoctorService
from app.core.security import get_current_user
from app.db.models.user import User

router = APIRouter()

@router.get('/', response_model=List[DoctorOut])
async def find_all_doctors(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1),
    search: Optional[str] = None
):
    result = await DoctorService.find_all_doctors(page, limit, search)
    return result['doctors'] if isinstance(result, dict) and 'doctors' in result else result

@router.get('/{id}', response_model=DoctorOut)
async def find_one_doctor(id: str):
    return await DoctorService.find_one_doctor(id)

@router.put('/{id}', response_model=DoctorOut)
async def update_doctor(id: str, update: DoctorUpdate, current_user: User = Depends(get_current_user)):
    return await DoctorService.update_doctor(id, update, current_user)

@router.put('/{id}/working-hours', response_model=DoctorOut)
async def update_working_hours(id: str, working_hours: Dict[str, Dict[str, str]], current_user: User = Depends(get_current_user)):
    return await DoctorService.update_working_hours(id, working_hours, current_user) 