from fastapi import APIRouter, Depends, HTTPException, status, Query
from app.core.security import get_current_user
from app.db.models.user import User
from app.schemas.prescription import PrescriptionCreate, PrescriptionUpdate, PrescriptionOut, PrescriptionPaginatedResponse
from app.services.prescription_service import PrescriptionService
from beanie import PydanticObjectId
from typing import Dict, Any, Union

router = APIRouter()

@router.post("/")
async def create_prescription(
    prescription_data: PrescriptionCreate,
    current_user: User = Depends(get_current_user)
) -> PrescriptionOut:
    """Create a new prescription"""
    if current_user.role != "doctor":
        raise HTTPException(status_code=403, detail="Only doctors can create prescriptions")
    
    return await PrescriptionService.create_prescription(prescription_data, current_user)

@router.get("/patient")
async def get_patient_prescriptions(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    current_user: User = Depends(get_current_user)
) -> PrescriptionPaginatedResponse:
    """Get prescriptions for the current patient user"""
    if current_user.role != "patient":
        raise HTTPException(status_code=403, detail="Only patients can access their prescriptions")
    
    return await PrescriptionService.find_patient_prescriptions(current_user, page, limit)

@router.get("/doctor")
async def get_doctor_prescriptions(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    current_user: User = Depends(get_current_user)
) -> PrescriptionPaginatedResponse:
    """Get prescriptions created by the current doctor user"""
    if current_user.role != "doctor":
        raise HTTPException(status_code=403, detail="Only doctors can access their prescriptions")
    
    return await PrescriptionService.find_doctor_prescriptions(current_user, page, limit)

@router.get("/{id}")
async def get_prescription(
    id: str,
    current_user: User = Depends(get_current_user)
) -> PrescriptionOut:
    """Get a specific prescription by ID"""
    return await PrescriptionService.find_one_prescription(id, current_user)

@router.put("/{id}")
async def update_prescription(
    id: str,
    prescription_update: PrescriptionUpdate,
    current_user: User = Depends(get_current_user)
) -> PrescriptionOut:
    """Update a prescription (only by the prescribing doctor)"""
    if current_user.role != "doctor":
        raise HTTPException(status_code=403, detail="Only doctors can update prescriptions")
    
    return await PrescriptionService.update_prescription(id, prescription_update, current_user) 