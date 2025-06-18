import re
from app.db.models.doctor import Doctor
from app.db.models.user import User
from app.schemas.doctor import DoctorCreate, DoctorUpdate, DoctorOut
from beanie import PydanticObjectId
from fastapi import HTTPException
from typing import List, Optional, Dict
from beanie.operators import And, Or
from app.core.security import pwd_context

class DoctorService:
    @staticmethod
    async def find_all_doctors(page: int = 1, limit: int = 10, search: Optional[str] = None) -> dict:
        skip = (page - 1) * limit
        user_query = {"role": "doctor"}
        user_ids_by_name = set()
        user_ids_by_speciality = set()

        print(f"Search term: {search}")  # Debug log

        if search:
            # Find users by name
            users_by_name = await User.find({
                "role": "doctor",
                "fullName": {"$regex": search, "$options": "i"}
            }).to_list()
            user_ids_by_name = {user.id for user in users_by_name}
            print(f"Users found by name: {len(users_by_name)}")  # Debug log
            print(f"Users found by name: {user_ids_by_name}")  # Debug log

            # Find doctors by speciality
            doctors_by_speciality = await Doctor.find({
                "speciality": {"$regex": search, "$options": "i"}
            }).to_list()
            
            # Fetch links for speciality search results
            for doc in doctors_by_speciality:
                await doc.fetch_link(Doctor.userId)
            user_ids_by_speciality = {doc.userId.id for doc in doctors_by_speciality}
            print(f"Doctors found by speciality: {len(doctors_by_speciality)}")  # Debug log

            # Union of user IDs
            user_ids = list(user_ids_by_name | user_ids_by_speciality)
         
            
            # Convert user IDs to Link references
            user_links = [User.link_from_id(PydanticObjectId(uid)) for uid in user_ids]
            doctors = await Doctor.find({"userId": {"$in": user_links}}).skip(skip).limit(limit).to_list()
            
            # Fetch links and process results
            for doctor in doctors:
                await doctor.fetch_link(Doctor.userId)
            doctor_out_list = [DoctorOut.model_validate(doc.model_dump()) for doc in doctors]
            
            # Count total for pagination
            total_doctors = await Doctor.find({"userId": {"$in": user_links}}).count()
            total_pages = (total_doctors + limit - 1) // limit
            print(f"Total doctors: {total_doctors}")  # Debug log
            print(f"Total pages: {total_pages}")  # Debug log
            print(f"Doctor out list: {doctor_out_list}")  # Debug log
            return {
                'totalPages': total_pages,
                'currentPage': page,
                'doctors': doctor_out_list
            }
        else:
            # No search - get all doctors
            doctors = await Doctor.find().skip(skip).limit(limit).to_list()
            for doctor in doctors:
                await doctor.fetch_link(Doctor.userId)
            doctor_out_list = [DoctorOut.model_validate(doc.model_dump()) for doc in doctors]
            total_doctors = await Doctor.find().count()
            total_pages = (total_doctors + limit - 1) // limit
            return {
                'totalPages': total_pages,
                'currentPage': page,
                'doctors': doctor_out_list
            }

    @staticmethod
    async def find_one_doctor(id: str) -> dict:
        user = await User.get(PydanticObjectId(id))
        if not user:
            raise HTTPException(status_code=404, detail="Doctor not found")

        doctor = await Doctor.find_one(Doctor.userId.id == PydanticObjectId(id), fetch_links=True)
        if not doctor:
            raise HTTPException(status_code=404, detail="Doctor profile not found.")
        return DoctorOut.model_validate(doctor.model_dump())

    @staticmethod
    async def update_doctor(id: str, update: DoctorUpdate, current_user: User) -> dict:
        if str(current_user.id) != id:
            raise HTTPException(status_code=401, detail="Unauthorized.")

        doc = await Doctor.find_one(Doctor.userId.id == PydanticObjectId(id))
        if not doc:
            raise HTTPException(status_code=404, detail="Doctor profile not found.")

        update_data = update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(doc, field, value)

        await doc.save()
        return DoctorOut.model_validate(doc)

    @staticmethod
    async def update_working_hours(id: str, working_hours: Dict[str, Dict[str, str]], current_user: User) -> dict:
        if str(current_user.id) != id:
            raise HTTPException(status_code=401, detail="Unauthorized.")
        
        doctor = await Doctor.find_one(Doctor.userId.id == PydanticObjectId(id))
        if not doctor:
            raise HTTPException(status_code=404, detail="Doctor profile not found.")
        
        # Validate working hours format
        days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
        for day, hours in working_hours.items():
            if day not in days:
                raise HTTPException(status_code=400, detail=f"Invalid day: {day}")
            if "start" not in hours or "end" not in hours:
                raise HTTPException(status_code=400, detail=f"Missing start or end time for {day}")
            if not re.match(r'^([01]\d|2[0-3]):([0-5]\d)$', hours["start"]):
                raise HTTPException(status_code=400, detail=f"Invalid start time format for {day}. Use HH:MM.")
            if not re.match(r'^([01]\d|2[0-3]):([0-5]\d)$', hours["end"]):
                raise HTTPException(status_code=400, detail=f"Invalid end time format for {day}. Use HH:MM.")
            if hours["start"] >= hours["end"]:
                raise HTTPException(status_code=400, detail=f"Start time must be before end time for {day}")
        
        # Update only the provided days, preserve existing settings for other days
        current_working_hours = doctor.workingHours.copy()
        current_working_hours.update(working_hours)
        doctor.workingHours = current_working_hours
        
        await doctor.save()
        return DoctorOut.model_validate(doctor)

    @staticmethod
    async def admin_create_doctor(data):
        existing = await User.find_one({"email": data.email})
        if existing:
            raise HTTPException(status_code=409, detail="A user with this email already exists.")
        user = User(
            fullName=data.fullName,
            email=data.email,
            password=pwd_context.hash(data.password),
            phoneNumber=data.phoneNumber,
            role="doctor"
        )
        await user.insert()
        doctor = Doctor(
            userId=user,
            orgID=data.orgID,
            speciality=data.speciality,
            experience=data.experience,
            educationLevel=data.educationLevel
        )
        await doctor.insert()
        return DoctorOut.model_validate(doctor.model_dump())
