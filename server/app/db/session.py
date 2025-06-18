import motor.motor_asyncio
from beanie import init_beanie
from app.db.models.user import User
# Import other models as you create them
from app.core.config import get_settings

settings = get_settings()

async def initiate_database():
    client = motor.motor_asyncio.AsyncIOMotorClient(settings.MONGO_URI)
    database = client.get_default_database()
    await init_beanie(database, document_models=[User]) 