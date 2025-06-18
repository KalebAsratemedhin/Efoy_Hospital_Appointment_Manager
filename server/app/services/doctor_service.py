from app.db.models.doctor import Doctor
from app.db.models.user import User
from app.schemas.doctor import DoctorCreate, DoctorUpdate
from beanie import PydanticObjectId
from fastapi import HTTPException
from typing import List, Optional

class DoctorService:
    @staticmethod
    async def find_all_doctors(page: int = 1, limit: int = 10, search: Optional[str] = None) -> dict:
        skip = (page - 1) * limit
        if not search:
            doctors = await User.find(User.role == 'doctor').skip(skip).limit(limit).to_list()
            result = []
            for doctor in doctors:
                doc_data = await Doctor.find_one(Doctor.userId.id == doctor.id)
                result.append({**doctor.dict(), 'doctorData': doc_data.dict() if doc_data else None})
            total_doctors = await Doctor.count()
            return {
                'totalPages': (total_doctors + limit - 1) // limit,
                'currentPage': page,
                'doctors': result
            }
        else:
            doctors = await User.find({
                "$or": [
                    {"fullName": {"$regex": search, "$options": "i"}},
                    {"speciality": {"$regex": search, "$options": "i"}}
                ],
                "role": "doctor"
            }).to_list()
            result = []
            for doctor in doctors:
                doc_data = await Doctor.find_one(Doctor.userId.id == doctor.id)
                result.append({**doctor.dict(), 'doctorData': doc_data.dict() if doc_data else None})
            return result

    @staticmethod
    async def find_one_doctor(id: str) -> dict:
        user = await User.get(PydanticObjectId(id))
        if not user:
            raise HTTPException(status_code=404, detail="Doctor not found")
        doctor = await Doctor.find_one(Doctor.userId.id == id)
        return {**user.dict(), 'doctorData': doctor.dict() if doctor else None}

    @staticmethod
    async def update_doctor(id: str, update: DoctorUpdate, current_user: User) -> dict:
        if str(current_user.id) != id:
            raise HTTPException(status_code=401, detail="Unauthorized.")
        doc = await Doctor.find_one(Doctor.userId.id == id)
        if not doc:
            raise HTTPException(status_code=404, detail="Doctor profile not found.")
        update_data = update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(doc, field, value)
        await doc.save()
        return doc.dict() 