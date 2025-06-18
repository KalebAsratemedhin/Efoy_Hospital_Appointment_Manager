from app.db.models.rating import Rating
from app.db.models.user import User
from app.db.models.doctor import Doctor
from app.schemas.rating import RatingCreate, RatingUpdate
from beanie import PydanticObjectId
from fastapi import HTTPException
from typing import List, Optional

class RatingService:
    @staticmethod
    async def create_rating(data: RatingCreate, current_user: User):
        if str(current_user.id) == data.doctorId:
            raise HTTPException(status_code=400, detail="You cannot rate yourself.")
        duplicate = await Rating.find_one({"doctorId": PydanticObjectId(data.doctorId), "raterId": current_user.id})
        if duplicate:
            raise HTTPException(status_code=409, detail="Rating exists")
        rating = Rating(
            doctorId=PydanticObjectId(data.doctorId),
            raterId=current_user,
            value=data.value
        )
        await rating.insert()
        await RatingService.update_total_rating(data.doctorId)
        return await Doctor.find_one(Doctor.userId.id == data.doctorId)

    @staticmethod
    async def delete_rating(id: str, current_user: User):
        rating = await Rating.get(PydanticObjectId(id))
        if not rating:
            raise HTTPException(status_code=404, detail="Not found")
        doctorId = str(rating.doctorId.id)
        await rating.delete()
        await RatingService.update_total_rating(doctorId)
        return await Doctor.find_one(Doctor.userId.id == doctorId)

    @staticmethod
    async def update_rating(id: str, data: RatingUpdate, current_user: User):
        rating = await Rating.get(PydanticObjectId(id))
        if not rating:
            raise HTTPException(status_code=404, detail="Not found")
        update_data = data.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(rating, field, value)
        await rating.save()
        doctorId = str(rating.doctorId.id)
        await RatingService.update_total_rating(doctorId)
        return await Doctor.find_one(Doctor.userId.id == doctorId)

    @staticmethod
    async def get_rating(doctorId: str, current_user: User):
        rating = await Rating.find_one({"raterId": current_user.id, "doctorId": PydanticObjectId(doctorId)})
        return rating

    @staticmethod
    async def get_favorites(current_user: User):
        favorites = await Rating.find({"raterId": current_user.id}).to_list()
        doctor_ids = list({str(r.doctorId.id) for r in favorites})
        result = []
        for doc_id in doctor_ids:
            user = await User.get(PydanticObjectId(doc_id))
            doc = await Doctor.find_one(Doctor.userId.id == doc_id)
            result.append({**user.dict(), 'doctorData': doc.dict() if doc else None})
        return result

    @staticmethod
    async def update_total_rating(doctorId: str):
        ratings = await Rating.find({"doctorId": PydanticObjectId(doctorId)}).to_list()
        total = sum(r.value for r in ratings)
        avg = total / len(ratings) if ratings else 0
        doctor = await Doctor.find_one(Doctor.userId.id == doctorId)
        if doctor:
            doctor.rating = avg
            await doctor.save()
        return doctor 