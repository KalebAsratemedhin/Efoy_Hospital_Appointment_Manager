import asyncio
from app.db.session import initiate_database
from app.services.auth_service import AuthService
from app.schemas.auth import AuthSignup
from app.core.config import get_settings

async def seed_admin():
    await initiate_database()
    admin_data = AuthSignup(
        fullName="Admin User",
        email="admin@efoy.com",
        password="adminpassword123",
        phoneNumber="1234567890",
        role="admin"
    )
    try:
        result = await AuthService.signup(admin_data)
        print("Admin user created:", result)
    except Exception as e:
        print("Admin user may already exist or error occurred:", e)

if __name__ == "__main__":
    asyncio.run(seed_admin()) 