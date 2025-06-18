from app.db.models.booking import Booking
from app.db.models.user import User
from app.schemas.booking import BookingCreate, BookingUpdate
from beanie import PydanticObjectId
from datetime import date, datetime, timedelta
from fastapi import HTTPException, status
from typing import List
import re

class BookingService:
    @staticmethod
    async def find_all_user_bookings(current_user: User) -> List[Booking]:
        if current_user.role == "patient":
            return await Booking.find(Booking.patientId.id == current_user.id).to_list()
        elif current_user.role == "doctor":
            return await Booking.find(Booking.doctorId.id == current_user.id).to_list()
        else:
            raise HTTPException(status_code=403, detail="No such role")

    @staticmethod
    async def find_recent_booking(current_user: User) -> Booking:
        if current_user.role == "patient":
            query = {"patientId": current_user.id}
        else:
            query = {"doctorId": current_user.id}
        booking = await Booking.find(query).sort([("appointmentDate", 1), ("time", 1)]).first_or_none()
        if not booking:
            raise HTTPException(status_code=404, detail="No recent booking found")
        return booking

    @staticmethod
    async def find_one_booking(id: str) -> Booking:
        booking = await Booking.get(PydanticObjectId(id))
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        return booking

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
        all_slots = generate_time_slots("08:00", "17:30", 20)
        bookings = await Booking.find({"doctorId": PydanticObjectId(doctorId), "appointmentDate": date_}).to_list()
        booked_slots = [b.time for b in bookings]
        return [slot for slot in all_slots if slot not in booked_slots]

    @staticmethod
    async def create_booking(booking_in: BookingCreate, current_user: User) -> Booking:
        # Validate date
        if booking_in.appointmentDate < date.today():
            raise HTTPException(status_code=400, detail="Appointment date cannot be in the past.")
        # Validate time format (HH:MM)
        if not re.match(r"^([01]\\d|2[0-3]):([0-5]\\d)$", booking_in.time):
            raise HTTPException(status_code=400, detail="Invalid time format. Use HH:MM.")
        # Check for existing booking
        existing = await Booking.find({"doctorId": PydanticObjectId(booking_in.doctorId), "appointmentDate": booking_in.appointmentDate, "time": booking_in.time}).to_list()
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
        return booking

    @staticmethod
    async def update_booking(id: str, booking_update: BookingUpdate) -> Booking:
        booking = await Booking.get(PydanticObjectId(id))
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        update_data = booking_update.dict(exclude_unset=True)
        if "appointmentDate" in update_data and update_data["appointmentDate"] < date.today():
            raise HTTPException(status_code=400, detail="Appointment date cannot be in the past.")
        if "time" in update_data and not re.match(r"^([01]\\d|2[0-3]):([0-5]\\d)$", update_data["time"]):
            raise HTTPException(status_code=400, detail="Invalid time format. Use HH:MM.")
        for field, value in update_data.items():
            setattr(booking, field, value)
        await booking.save()
        return booking

    @staticmethod
    async def delete_booking(id: str) -> None:
        booking = await Booking.get(PydanticObjectId(id))
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        await booking.delete()

    @staticmethod
    async def doctor_summary(doctorId: str) -> List[int]:
        bookings = await Booking.find({"doctorId": PydanticObjectId(doctorId)}).to_list()
        data = [0] * 12
        for booking in bookings:
            month = booking.appointmentDate.month - 1
            data[month] += 1
        return data

    @staticmethod
    async def patient_summary(patientId: str) -> List[int]:
        bookings = await Booking.find({"patientId": PydanticObjectId(patientId)}).to_list()
        data = [0] * 12
        for booking in bookings:
            month = booking.appointmentDate.month - 1
            data[month] += 1
        return data 