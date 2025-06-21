from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from typing import List
from app.schemas.user import UserOut, UserUpdate
from app.db.models.user import User
from app.core.security import get_current_user, admin_required
from beanie import PydanticObjectId
import cloudinary.uploader
from app.utils.serialization import serialize_mongo_doc, serialize_mongo_docs

router = APIRouter()

@router.get('/current-user', response_model=UserOut)
async def get_user(current_user: User = Depends(get_current_user)):
    return serialize_mongo_doc(current_user)

@router.get('/admin-stats')
async def admin_stats(current_user: User = Depends(admin_required)):
    from app.db.models.doctor import Doctor
    from app.db.models.booking import Booking
    doctors_count = await Doctor.find_all().count()
    patients_count = await User.find(User.role == 'patient').count()
    appointments_count = await Booking.find_all().count()
    return {"doctorsCount": doctors_count, "patientsCount": patients_count, "appointmentsCount": appointments_count}

@router.get('/', response_model=List[UserOut])
async def find_all_users(current_user: User = Depends(get_current_user)):
    users = await User.find_all().to_list()
    return serialize_mongo_docs(users)

@router.get('/{id}', response_model=UserOut)
async def find_one_user(id: str, current_user: User = Depends(get_current_user)):
    user = await User.get(PydanticObjectId(id))
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return serialize_mongo_doc(user)

@router.put('/{id}', response_model=UserOut)
async def update_user(id: str, user_update: UserUpdate, current_user: User = Depends(get_current_user)):
    if str(current_user.id) != id:
        raise HTTPException(status_code=401, detail="Unauthorized.")
    user = await User.get(PydanticObjectId(id))
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    user.update(user_update.dict(exclude_unset=True))
    await user.save()
    return serialize_mongo_doc(user)

@router.put('/profile-pic/{id}', response_model=UserOut)
async def update_profile_picture(id: str, file: UploadFile = File(...), current_user: User = Depends(get_current_user)):
    user = await User.get(PydanticObjectId(id))
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    result = cloudinary.uploader.upload(file.file)
    user.profilePic = result['secure_url']
    await user.save()
    return serialize_mongo_doc(user) 