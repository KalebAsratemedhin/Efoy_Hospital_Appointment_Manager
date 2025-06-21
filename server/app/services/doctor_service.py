import re
from app.db.models.doctor import Doctor
from app.db.models.user import User
from app.schemas.doctor import DoctorCreate, DoctorUpdate
from beanie import PydanticObjectId
from fastapi import HTTPException
from typing import List, Optional
from beanie.operators import And, Or
from app.utils.serialization import serialize_mongo_doc, serialize_mongo_docs

class DoctorService:
    @staticmethod
    async def find_all_doctors(page: int = 1, limit: int = 10, search: Optional[str] = None) -> dict:
        skip = (page - 1) * limit
        result = []

        if not search:
            doctors = await User.find(User.role == 'doctor').skip(skip).limit(limit).to_list()
        else:
            doctors = await User.find(
                And(
                    Or(
                        User.fullName.matches(search, flags=re.IGNORECASE),
                        User.speciality.matches(search, flags=re.IGNORECASE)
                    ),
                    User.role == "doctor"
                )
            ).to_list()

        for doctor in doctors:
            doc_data = await Doctor.find_one(Doctor.userId.id == PydanticObjectId(str(doctor.id)))
            result.append({
                **serialize_mongo_doc(doctor),
                'doctorData': serialize_mongo_doc(doc_data) if doc_data else None
            })

        if not search:
            total_doctors = await User.find(User.role == 'doctor').count()
            return {
                'totalPages': (total_doctors + limit - 1) // limit,
                'currentPage': page,
                'doctors': result
            }
        else:
            return result

    @staticmethod
    async def find_one_doctor(id: str) -> dict:
        user = await User.get(PydanticObjectId(id))
        if not user:
            raise HTTPException(status_code=404, detail="Doctor not found")

        doctor = await Doctor.find_one(Doctor.userId.id == PydanticObjectId(id))
        return {
            **serialize_mongo_doc(user),
            'doctorData': serialize_mongo_doc(doctor) if doctor else None
        }

    @staticmethod
    async def update_doctor(id: str, update: DoctorUpdate, current_user: User) -> dict:
        if str(current_user.id) != id:
            raise HTTPException(status_code=401, detail="Unauthorized.")

        doc = await Doctor.find_one(Doctor.userId.id == PydanticObjectId(id))
        if not doc:
            raise HTTPException(status_code=404, detail="Doctor profile not found.")

        update_data = update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(doc, field, value)

        await doc.save()
        return serialize_mongo_doc(doc)
