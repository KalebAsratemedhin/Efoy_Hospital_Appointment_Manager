from fastapi import APIRouter, Depends, HTTPException
from app.services.dashboard_service import DashboardService
from app.core.security import get_current_user
from app.db.models.user import User

router = APIRouter()

@router.get('/doctor')
async def get_doctor_dashboard(current_user: User = Depends(get_current_user)):
    """Get comprehensive doctor dashboard data"""
    if current_user.role != "doctor":
        raise HTTPException(status_code=403, detail="Access denied")
    
    return await DashboardService.get_doctor_dashboard(str(current_user.id))

@router.get('/patient')
async def get_patient_dashboard(current_user: User = Depends(get_current_user)):
    """Get comprehensive patient dashboard data"""
    if current_user.role != "patient":
        raise HTTPException(status_code=403, detail="Access denied")
    
    return await DashboardService.get_patient_dashboard(str(current_user.id)) 