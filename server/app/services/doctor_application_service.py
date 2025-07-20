from app.db.models.doctor_application import DoctorApplication
from app.db.models.doctor import Doctor
from app.db.models.user import User
from app.schemas.doctor_application import DoctorApplicationCreate, DoctorApplicationUpdate
from beanie import PydanticObjectId
from fastapi import HTTPException
from typing import List, Optional, Literal

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
        return application.model_dump()

    @staticmethod
    async def update_application(id: str, data: DoctorApplicationUpdate, current_user: User):
        application = await DoctorApplication.get(PydanticObjectId(id))
        if not application:
            raise HTTPException(status_code=404, detail="Application not found")
        
        if str(application.userId.ref.id) != str(current_user.id):
            raise HTTPException(status_code=403, detail="You can only update your own application")
        
        if application.status != 'pending':
            raise HTTPException(status_code=400, detail="Cannot update approved or rejected application")
        
        update_data = data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(application, field, value)
        
        await application.save()
        return {"message": "Application updated successfully", "application": application.model_dump()}

    @staticmethod
    async def update_application_status(id: str, status: Literal['approved', 'rejected'], current_user: User):
        if current_user.role != 'admin':
            raise HTTPException(status_code=403, detail="Only admins can update application status")
        
        application = await DoctorApplication.get(PydanticObjectId(id))
        if not application:
            raise HTTPException(status_code=404, detail="Application not found")
        
        if application.status != 'pending':
            raise HTTPException(status_code=400, detail="Application has already been processed")
        
        application.status = status
        await application.save()
        
        return {"message": f"Application {status} successfully", "application": application.model_dump()}

    @staticmethod
    async def delete_application(current_user: User):
        application = await DoctorApplication.find_one(DoctorApplication.userId.id == current_user.id)
        if not application:
            raise HTTPException(status_code=404, detail='Application not found.')
        await application.delete()
        return {"message": "Application deleted successfully"}

    @staticmethod
    async def get_all_applications(current_user: User):
        if current_user.role != 'admin':
            raise HTTPException(status_code=403, detail="Only admins can view all applications")
        
        applications = await DoctorApplication.find_all().to_list()
        return [a.model_dump() for a in applications]

    @staticmethod
    async def get_my_application(current_user: User):
        application = await DoctorApplication.find_one(DoctorApplication.userId.id == current_user.id)
        return application.model_dump()

    @staticmethod
    async def get_application_by_id(id: str, current_user: User):
        application = await DoctorApplication.get(PydanticObjectId(id))
        if not application:
            raise HTTPException(status_code=404, detail="Application not found")
        
        if str(application.userId.ref.id) != str(current_user.id) and current_user.role != 'admin':
            raise HTTPException(status_code=403, detail="Not authorized to view this application")
        
        return application.model_dump() 