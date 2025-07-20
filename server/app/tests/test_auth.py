import pytest
import asyncio
from httpx import AsyncClient
from app.main import app
from app.schemas.auth import AuthSignup, AuthLogin
import pytest_asyncio

@pytest.mark.asyncio
async def test_signup_success():
    user_data = {
        "fullName": "Test User",
        "email": "test@example.com",
        "password": "testpassword123",
        "phoneNumber": "1234567890",
        "role": "patient"
    }
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/api/v1/auth/signup", json=user_data)
        assert response.status_code == 201
        data = response.json()
        assert "accessToken" in data
        assert "id" in data
        assert data["role"] == "patient"

@pytest.mark.asyncio
async def test_signup_duplicate_email():
    user_data = {
        "fullName": "Test User",
        "email": "duplicate@example.com",
        "password": "testpassword123",
        "phoneNumber": "1234567890",
        "role": "patient"
    }
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/api/v1/auth/signup", json=user_data)
        assert response.status_code == 201
        response = await ac.post("/api/v1/auth/signup", json=user_data)
        assert response.status_code == 409

@pytest.mark.asyncio
async def test_signin_success():
    user_data = {
        "fullName": "Test User",
        "email": "signin@example.com",
        "password": "testpassword123",
        "phoneNumber": "1234567890",
        "role": "patient"
    }
    async with AsyncClient(app=app, base_url="http://test") as ac:
        await ac.post("/api/v1/auth/signup", json=user_data)
        login_data = {
            "email": "signin@example.com",
            "password": "testpassword123"
        }
        response = await ac.post("/api/v1/auth/signin", json=login_data)
        assert response.status_code == 200
        data = response.json()
        assert "accessToken" in data

@pytest.mark.asyncio
async def test_signin_invalid_credentials():
    login_data = {
        "email": "nonexistent@example.com",
        "password": "wrongpassword"
    }
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/api/v1/auth/signin", json=login_data)
    assert response.status_code == 400

@pytest.mark.asyncio
async def test_signout():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/api/v1/auth/signout")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] == True 


@pytest.mark.asyncio
async def test_full_flow():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        # 1. Signup a user (patient)
        user_email = "flowuser@example.com"
        user_data = {
            "fullName": "Flow User",
            "email": user_email,
            "password": "flowpassword123",
            "phoneNumber": "1112223333",
            "role": "patient"
        }
        resp = await ac.post("/api/v1/auth/signup", json=user_data)
        assert resp.status_code == 201
        user_token = resp.json()["accessToken"]
        user_id = resp.json()["id"]

        # 2. Signin
        login_data = {"email": user_email, "password": "flowpassword123"}
        resp = await ac.post("/api/v1/auth/signin", json=login_data)
        assert resp.status_code == 200
        assert "accessToken" in resp.json()

        # 3. Update profile
        update_data = {"fullName": "Flow User Updated", "phoneNumber": "9998887777"}
        resp = await ac.put(f"/api/v1/user/{user_id}", json=update_data, headers={"Authorization": f"Bearer {user_token}"})
        assert resp.status_code == 200
        assert resp.json()["fullName"] == "Flow User Updated"

        # 4. Create doctor application
        doc_app_data = {
            "orgID": "HOSP123",
            "speciality": "Cardiology",
            "experience": "5 years",
            "educationLevel": "MD"
        }
        resp = await ac.post("/api/v1/doctor-application/", json=doc_app_data, headers={"Authorization": f"Bearer {user_token}"})
        assert resp.status_code == 201
        app_id = resp.json()["id"] if "id" in resp.json() else resp.json().get("_id", None)
        assert app_id is not None

        # 5. Seed an admin
        admin_email = "flowadmin@example.com"
        admin_data = {
            "fullName": "Flow Admin",
            "email": admin_email,
            "password": "adminpassword123",
            "phoneNumber": "4445556666",
            "role": "admin"
        }
        resp = await ac.post("/api/v1/auth/signup", json=admin_data)
        assert resp.status_code == 201
        admin_token = resp.json()["accessToken"]

        # 6. Admin login
        admin_login = {"email": admin_email, "password": "adminpassword123"}
        resp = await ac.post("/api/v1/auth/signin", json=admin_login)
        assert resp.status_code == 200
        admin_token = resp.json()["accessToken"]

        # 7. Admin reviews and approves the application
        eval_data = {"status": "approved"}
        resp = await ac.put(f"/api/v1/doctor-application/evaluate/{app_id}", json=eval_data, headers={"Authorization": f"Bearer {admin_token}"})
        assert resp.status_code == 200
        assert resp.json()["application"]["status"] == "approved"

        # 8. User logout
        resp = await ac.post("/api/v1/auth/signout", headers={"Authorization": f"Bearer {user_token}"})
        assert resp.status_code == 200
        assert resp.json()["success"] == True 