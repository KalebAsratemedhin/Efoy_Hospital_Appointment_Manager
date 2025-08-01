import asyncio
from app.db.session import initiate_database
from app.services.doctor_service import DoctorService
from app.schemas.doctor import DoctorCreate

async def seed_doctors():
    await initiate_database()
    
    # Ethiopian doctors with different specialties and data
    doctors_data = [
        {
            "fullName": "Abebe Kebede",
            "email": "abebe.kebede@efoy.com",
            "password": "doctor123",
            "phoneNumber": "+251911234567",
            "orgID": "org_001",
            "speciality": "Cardiology",
            "experience": "15 years",
            "educationLevel": "MD, Cardiology Fellowship",
            "workingHours": {
                "monday": {"start": "08:00", "end": "16:00"},
                "tuesday": {"start": "08:00", "end": "16:00"},
                "wednesday": {"start": "08:00", "end": "16:00"},
                "thursday": {"start": "08:00", "end": "16:00"},
                "friday": {"start": "08:00", "end": "16:00"},
                "saturday": {"start": "09:00", "end": "13:00"},
                "sunday": {"start": "09:00", "end": "13:00"}
            }
        },
        {
            "fullName": "Kidist Haile",
            "email": "kidist.haile@efoy.com",
            "password": "doctor123",
            "phoneNumber": "+251922345678",
            "orgID": "org_002",
            "speciality": "Pediatrics",
            "experience": "12 years",
            "educationLevel": "MD, Pediatric Residency",
            "workingHours": {
                "monday": {"start": "09:00", "end": "17:00"},
                "tuesday": {"start": "09:00", "end": "17:00"},
                "wednesday": {"start": "09:00", "end": "17:00"},
                "thursday": {"start": "09:00", "end": "17:00"},
                "friday": {"start": "09:00", "end": "17:00"},
                "saturday": {"start": "10:00", "end": "14:00"},
                "sunday": {"start": "10:00", "end": "14:00"}
            }
        },
        {
            "fullName": "Yohannes Tadesse",
            "email": "yohannes.tadesse@efoy.com",
            "password": "doctor123",
            "phoneNumber": "+251933456789",
            "orgID": "org_003",
            "speciality": "Orthopedics",
            "experience": "18 years",
            "educationLevel": "MD, Orthopedic Surgery",
            "workingHours": {
                "monday": {"start": "07:00", "end": "15:00"},
                "tuesday": {"start": "07:00", "end": "15:00"},
                "wednesday": {"start": "07:00", "end": "15:00"},
                "thursday": {"start": "07:00", "end": "15:00"},
                "friday": {"start": "07:00", "end": "15:00"},
                "saturday": {"start": "08:00", "end": "12:00"},
                "sunday": {"start": "08:00", "end": "12:00"}
            }
        },
        {
            "fullName": "Bethlehem Assefa",
            "email": "bethlehem.assefa@efoy.com",
            "password": "doctor123",
            "phoneNumber": "+251944567890",
            "orgID": "org_004",
            "speciality": "Dermatology",
            "experience": "10 years",
            "educationLevel": "MD, Dermatology Fellowship",
            "workingHours": {
                "monday": {"start": "10:00", "end": "18:00"},
                "tuesday": {"start": "10:00", "end": "18:00"},
                "wednesday": {"start": "10:00", "end": "18:00"},
                "thursday": {"start": "10:00", "end": "18:00"},
                "friday": {"start": "10:00", "end": "18:00"},
                "saturday": {"start": "11:00", "end": "15:00"},
                "sunday": {"start": "11:00", "end": "15:00"}
            }
        },
        {
            "fullName": "Dawit Mengistu",
            "email": "dawit.mengistu@efoy.com",
            "password": "doctor123",
            "phoneNumber": "+251955678901",
            "orgID": "org_005",
            "speciality": "Neurology",
            "experience": "20 years",
            "educationLevel": "MD, Neurology Fellowship",
            "workingHours": {
                "monday": {"start": "08:30", "end": "16:30"},
                "tuesday": {"start": "08:30", "end": "16:30"},
                "wednesday": {"start": "08:30", "end": "16:30"},
                "thursday": {"start": "08:30", "end": "16:30"},
                "friday": {"start": "08:30", "end": "16:30"},
                "saturday": {"start": "09:30", "end": "13:30"},
                "sunday": {"start": "09:30", "end": "13:30"}
            }
        }
    ]
    
    created_doctors = []
    
    for doctor_data in doctors_data:
        try:
            doctor_create = DoctorCreate(**doctor_data)
            result = await DoctorService.admin_create_doctor(doctor_create)
            created_doctors.append(result)
            print(f"Doctor created: {doctor_data['fullName']} - {doctor_data['speciality']}")
        except Exception as e:
            print(f"Error creating doctor {doctor_data['fullName']}: {e}")
    
    print(f"\nTotal doctors created: {len(created_doctors)}")
    return created_doctors

if __name__ == "__main__":
    asyncio.run(seed_doctors()) 