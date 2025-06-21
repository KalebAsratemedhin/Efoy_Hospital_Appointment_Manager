from app.db.models.booking import Booking
from app.db.models.user import User
from app.db.models.doctor import Doctor
from app.schemas.booking import BookingCreate, BookingUpdate
from beanie import PydanticObjectId
from datetime import date, datetime, timedelta
from fastapi import HTTPException, status
from typing import List
from beanie.operators import And
import re
from app.utils.serialization import serialize_mongo_doc, serialize_mongo_docs

class BookingService:
    @staticmethod
    def _get_day_name(appointment_date: date) -> str:
        """Convert date to day name for working hours lookup"""
        days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
        return days[appointment_date.weekday()]

    @staticmethod
    def _is_within_working_hours(doctor_working_hours: dict, day: str, time: str) -> bool:
        """Check if the appointment time is within doctor's working hours"""
        if day not in doctor_working_hours:
            return False
        
        day_hours = doctor_working_hours[day]
        start_time = day_hours.get("start", "08:00")
        end_time = day_hours.get("end", "17:00")
        
        return start_time <= time <= end_time

    @staticmethod
    async def find_all_user_bookings(current_user: User) -> List[dict]:
        if current_user.role == "patient":
            bookings = await Booking.find(Booking.patientId.id == current_user.id).to_list()
        elif current_user.role == "doctor":
            bookings = await Booking.find(Booking.doctorId.id == current_user.id).to_list()
        else:
            raise HTTPException(status_code=403, detail="No such role")
        return serialize_mongo_docs(bookings)

    @staticmethod
    async def find_recent_booking(current_user: User) -> dict:
        if current_user.role == "patient":
            booking = await Booking.find(Booking.patientId.id == current_user.id).sort([("appointmentDate", 1), ("time", 1)]).first_or_none()
        else:
            booking = await Booking.find(Booking.doctorId.id == current_user.id).sort([("appointmentDate", 1), ("time", 1)]).first_or_none()
        if not booking:
            raise HTTPException(status_code=404, detail="No recent booking found")
        return serialize_mongo_doc(booking)

    @staticmethod
    async def find_one_booking(id: str) -> dict:
        booking = await Booking.get(PydanticObjectId(id))
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        return serialize_mongo_doc(booking)

    @staticmethod
    async def find_available_time_slots(doctorId: str, date_: date) -> List[str]:
        def generate_time_slots(start, end, interval):
            slots = []
            current = datetime.strptime(start, "%H:%M")
            end_time = datetime.strptime(end, "%H:%M")
            while current <= end_time:
                slots.append(current.strftime("%H:%M"))
                current += timedelta(minutes=interval)
            return slots
        
        # Get doctor's working hours
        doctor = await Doctor.find_one(Doctor.userId.id == PydanticObjectId(doctorId))
        if not doctor:
            raise HTTPException(status_code=404, detail="Doctor not found")
        
        day_name = BookingService._get_day_name(date_)
        working_hours = doctor.workingHours.get(day_name, {"start": "08:00", "end": "17:00"})
        
        all_slots = generate_time_slots(working_hours["start"], working_hours["end"], 20)
        bookings = await Booking.find(
            And(
                Booking.doctorId.id == PydanticObjectId(doctorId),
                Booking.appointmentDate == date_
            )
        ).to_list()
        booked_slots = [b.time for b in bookings]
        return [slot for slot in all_slots if slot not in booked_slots]

    @staticmethod
    async def create_booking(booking_in: BookingCreate, current_user: User) -> dict:
        # Validate date
        if booking_in.appointmentDate < date.today():
            raise HTTPException(status_code=400, detail="Appointment date cannot be in the past.")
        
        # Validate time format (HH:MM)
        if not re.match(r"^([01]\d|2[0-3]):([0-5]\d)$", booking_in.time):
            raise HTTPException(status_code=400, detail="Invalid time format. Use HH:MM.")
        
        # Get doctor and check working hours
        doctor = await Doctor.find_one(Doctor.userId.id == PydanticObjectId(booking_in.doctorId))
        if not doctor:
            raise HTTPException(status_code=404, detail="Doctor not found")
        
        day_name = BookingService._get_day_name(booking_in.appointmentDate)
        if not BookingService._is_within_working_hours(doctor.workingHours, day_name, booking_in.time):
            working_hours = doctor.workingHours.get(day_name, {"start": "08:00", "end": "17:00"})
            raise HTTPException(
                status_code=400, 
                detail=f"Appointment time is outside doctor's working hours for {day_name} ({working_hours['start']} - {working_hours['end']})"
            )
        
        # Check for existing booking
        existing = await Booking.find(
            And(
                Booking.doctorId.id == PydanticObjectId(booking_in.doctorId),
                Booking.appointmentDate == booking_in.appointmentDate,
                Booking.time == booking_in.time
            )
        ).to_list()
        if existing:
            raise HTTPException(status_code=402, detail="Time slot is unavailable.")
        
        booking = Booking(
            patientId=current_user,
            doctorId=PydanticObjectId(booking_in.doctorId),
            appointmentDate=booking_in.appointmentDate,
            time=booking_in.time,
            reason=booking_in.reason,
            status="pending"
        )
        await booking.insert()
        return serialize_mongo_doc(booking)

    @staticmethod
    async def update_booking(id: str, booking_update: BookingUpdate) -> dict:
        booking = await Booking.get(PydanticObjectId(id))
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        
        update_data = booking_update.model_dump(exclude_unset=True)
        
        # Validate appointment date if being updated
        if "appointmentDate" in update_data and update_data["appointmentDate"] < date.today():
            raise HTTPException(status_code=400, detail="Appointment date cannot be in the past.")
        
        # Validate time format if being updated
        if "time" in update_data and not re.match(r"^([01]\d|2[0-3]):([0-5]\d)$", update_data["time"]):
            raise HTTPException(status_code=400, detail="Invalid time format. Use HH:MM.")
        
        # Check working hours if date or time is being updated
        if "appointmentDate" in update_data or "time" in update_data:
            appointment_date = update_data.get("appointmentDate", booking.appointmentDate)
            appointment_time = update_data.get("time", booking.time)
            
            # Get doctor and check working hours
            doctor = await Doctor.find_one(Doctor.userId.id == booking.doctorId.id)
            if doctor:
                day_name = BookingService._get_day_name(appointment_date)
                if not BookingService._is_within_working_hours(doctor.workingHours, day_name, appointment_time):
                    working_hours = doctor.workingHours.get(day_name, {"start": "08:00", "end": "17:00"})
                    raise HTTPException(
                        status_code=400, 
                        detail=f"Appointment time is outside doctor's working hours for {day_name} ({working_hours['start']} - {working_hours['end']})"
                    )
        
        # Check for conflicts if date or time is being updated
        if "appointmentDate" in update_data or "time" in update_data:
            new_date = update_data.get("appointmentDate", booking.appointmentDate)
            new_time = update_data.get("time", booking.time)
            
            existing = await Booking.find(
                And(
                    Booking.doctorId.id == booking.doctorId.id,
                    Booking.appointmentDate == new_date,
                    Booking.time == new_time,
                    Booking.id != booking.id
                )
            ).to_list()
            if existing:
                raise HTTPException(status_code=402, detail="Time slot is unavailable.")
        
        for field, value in update_data.items():
            setattr(booking, field, value)
        
        await booking.save()
        return serialize_mongo_doc(booking)

    @staticmethod
    async def delete_booking(id: str) -> None:
        booking = await Booking.get(PydanticObjectId(id))
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        await booking.delete()

    @staticmethod
    async def doctor_summary(doctorId: str) -> List[int]:
        bookings = await Booking.find(Booking.doctorId.id == PydanticObjectId(doctorId)).to_list()
        data = [0] * 12
        for booking in bookings:
            month = booking.appointmentDate.month - 1
            data[month] += 1
        return data

    @staticmethod
    async def patient_summary(patientId: str) -> List[int]:
        bookings = await Booking.find(Booking.patientId.id == PydanticObjectId(patientId)).to_list()
        data = [0] * 12
        for booking in bookings:
            month = booking.appointmentDate.month - 1
            data[month] += 1
        return data 