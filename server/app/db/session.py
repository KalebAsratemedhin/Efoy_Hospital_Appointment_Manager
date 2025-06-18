import motor.motor_asyncio
from beanie import init_beanie
from app.db.models.user import User
from app.db.models.booking import Booking
from app.db.models.doctor import Doctor
from app.db.models.comment import Comment
from app.db.models.rating import Rating
# Import other models as you create them
from app.core.config import get_settings

settings = get_settings()

async def initiate_database():
    client = motor.motor_asyncio.AsyncIOMotorClient(settings.MONGO_URI)
    database = client.get_default_database()
    await init_beanie(database, document_models=[User, Booking, Doctor, Comment, Rating]) 