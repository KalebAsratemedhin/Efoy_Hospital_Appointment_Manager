from fastapi import APIRouter, Depends, status
from typing import List, Optional
from app.schemas.doctor_application import DoctorApplicationCreate, DoctorApplicationUpdate, DoctorApplicationOut
from app.services.doctor_application_service import DoctorApplicationService
from app.core.security import get_current_user, admin_required
from app.db.models.user import User

router = APIRouter()

@router.post('/', status_code=status.HTTP_201_CREATED)
async def create_application(data: DoctorApplicationCreate, current_user: User = Depends(get_current_user)):
    return await DoctorApplicationService.create_application(data, current_user)

@router.put('/', status_code=status.HTTP_200_OK)
async def update_application(data: DoctorApplicationUpdate, current_user: User = Depends(get_current_user)):
    return await DoctorApplicationService.update_application(data, current_user)

@router.put('/evaluate/{applicationId}', status_code=status.HTTP_200_OK)
async def evaluate_application(applicationId: str, status_: str, current_user: User = Depends(admin_required)):
    return await DoctorApplicationService.evaluate_application(applicationId, status_)

@router.delete('/', status_code=status.HTTP_200_OK)
async def delete_application(current_user: User = Depends(get_current_user)):
    return await DoctorApplicationService.delete_application(current_user)

@router.get('/', response_model=List[DoctorApplicationOut])
async def get_all_applications(current_user: User = Depends(admin_required)):
    return await DoctorApplicationService.get_all_applications()

@router.get('/mine', response_model=Optional[DoctorApplicationOut])
async def get_my_application(current_user: User = Depends(get_current_user)):
    return await DoctorApplicationService.get_my_application(current_user)

@router.get('/{applicationId}', response_model=Optional[DoctorApplicationOut])
async def get_one_application(applicationId: str, current_user: User = Depends(get_current_user)):
    return await DoctorApplicationService.get_one_application(applicationId) 