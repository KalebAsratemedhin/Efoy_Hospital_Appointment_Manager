from app.db.models.doctor_application import DoctorApplication
from app.db.models.doctor import Doctor
from app.db.models.user import User
from app.schemas.doctor_application import DoctorApplicationCreate, DoctorApplicationUpdate
from beanie import PydanticObjectId
from fastapi import HTTPException
from typing import List, Optional
from app.utils.serialization import serialize_mongo_doc, serialize_mongo_docs

class DoctorApplicationService:
    @staticmethod
    async def create_application(data: DoctorApplicationCreate, current_user: User):
        existing = await DoctorApplication.find_one(DoctorApplication.userId.id == current_user.id)
        if existing:
            raise HTTPException(status_code=400, detail='You have already applied for the doctor role.')
        application = DoctorApplication(
            userId=current_user,
            orgID=data.orgID,
            speciality=data.speciality,
            experience=data.experience,
            educationLevel=data.educationLevel
        )
        await application.insert()
        return {"message": "Application submitted successfully"}

    @staticmethod
    async def update_application(data: DoctorApplicationUpdate, current_user: User):
        application = await DoctorApplication.find_one(DoctorApplication.userId.id == current_user.id)
        if not application:
            raise HTTPException(status_code=404, detail='Application not found.')
        update_data = data.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(application, field, value)
        await application.save()
        return {"message": "Application updated successfully", "application": serialize_mongo_doc(application)}

    @staticmethod
    async def evaluate_application(applicationId: str, status: str):
        application = await DoctorApplication.get(PydanticObjectId(applicationId))
        if not application:
            raise HTTPException(status_code=404, detail='Application not found.')
        application.status = status
        await application.save()
        if status == 'approved':
            duplicate = await Doctor.find_one(Doctor.userId.id == application.userId.ref.id)
            if not duplicate:
                doctor = Doctor(
                    userId=application.userId,
                    speciality=application.speciality,
                    experience=application.experience,
                    educationLevel=application.educationLevel,
                    orgID=application.orgID
                )
                await doctor.insert()
            user = await User.get(application.userId.ref.id)
            user.role = 'doctor'
            await user.save()
        elif status in ['rejected', 'pending']:
            doctor = await Doctor.find_one(Doctor.userId.id == application.userId.ref.id)
            if doctor:
                await doctor.delete()
            user = await User.get(application.userId.ref.id)
            user.role = 'patient'
            await user.save()
        return {"message": f"Application {status} successfully", "application": serialize_mongo_doc(application)}

    @staticmethod
    async def delete_application(current_user: User):
        application = await DoctorApplication.find_one(DoctorApplication.userId.id == current_user.id)
        if not application:
            raise HTTPException(status_code=404, detail='Application not found.')
        await application.delete()
        return {"message": "Application deleted successfully"}

    @staticmethod
    async def get_all_applications():
        applications = await DoctorApplication.find_all().to_list()
        return serialize_mongo_docs(applications)

    @staticmethod
    async def get_my_application(current_user: User):
        application = await DoctorApplication.find_one(DoctorApplication.userId.id == current_user.id)
        return serialize_mongo_doc(application)

    @staticmethod
    async def get_one_application(applicationId: str):
        application = await DoctorApplication.get(PydanticObjectId(applicationId))
        return serialize_mongo_doc(application) 