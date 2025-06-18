import pytest
import asyncio
from fastapi.testclient import TestClient
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.main import app
from app.db.models.user import User
from app.db.models.booking import Booking
from app.db.models.doctor import Doctor
from app.db.models.comment import Comment
from app.db.models.rating import Rating
from app.core.config import get_settings
from app.services.auth_service import AuthService
from app.schemas.auth import AuthSignup
import pytest_asyncio

settings = get_settings()

@pytest.fixture(scope="session")
def event_loop():
    """Create an instance of the default event loop for the test session."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()

@pytest_asyncio.fixture(autouse=True, scope="function")
async def initialize_beanie():
    """Ensure Beanie is initialized with the test database before each test and clear all collections."""
    client = AsyncIOMotorClient(settings.MONGO_URI)
    test_db = client.test_db
    await init_beanie(database=test_db, document_models=[User, Booking, Doctor, Comment, Rating])
    # Clear all collections before each test
    for model in [User, Booking, Doctor, Comment, Rating]:
        await model.get_motor_collection().delete_many({})
    yield
    client.close()

@pytest.fixture
def client():
    """Create a test client"""
    return TestClient(app)

@pytest.fixture
async def test_user():
    """Create a test user"""
    user_data = AuthSignup(
        fullName="Test User",
        email="test@example.com",
        password="testpassword123",
        phoneNumber="1234567890",
        role="patient"
    )
    auth_response = await AuthService.signup(user_data)
    return auth_response

@pytest.fixture
async def test_doctor():
    """Create a test doctor and Doctor profile"""
    doctor_data = AuthSignup(
        fullName="Test Doctor",
        email="doctor@example.com",
        password="testpassword123",
        phoneNumber="1234567890",
        role="doctor"
    )
    auth_response = await AuthService.signup(doctor_data)
    # Create Doctor profile
    from app.db.models.doctor import Doctor
    from app.db.models.user import User
    user = await User.get(auth_response.id)
    doctor_profile = Doctor(
        userId=user,
        orgID="test-org",
        speciality="General Medicine",
        experience="5 years",
        educationLevel="MD",
        # workingHours will use default
    )
    await doctor_profile.insert()
    return auth_response

@pytest.fixture
async def test_admin():
    """Create a test admin"""
    admin_data = AuthSignup(
        fullName="Test Admin",
        email="admin@example.com",
        password="testpassword123",
        phoneNumber="1234567890",
        role="admin"
    )
    auth_response = await AuthService.signup(admin_data)
    return auth_response 