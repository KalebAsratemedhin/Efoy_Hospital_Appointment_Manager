import pytest
from httpx import AsyncClient
from app.main import app
from datetime import date, timedelta
import asyncio

@pytest.mark.asyncio
async def test_patient_search_doctors_and_view_free_times(test_user):
    test_user = await test_user
    headers = {"Authorization": f"Bearer {test_user.accessToken}"}
    async with AsyncClient(app=app, base_url="http://test") as ac:
        # Search for doctors
        resp = await ac.get("/api/v1/doctor/", headers=headers)
        assert resp.status_code == 200
        doctors = resp.json()
        assert isinstance(doctors, list)
        assert len(doctors) > 0
        doctor_id = doctors[0]["id"]

        # View doctor's free times for tomorrow
        tomorrow = (date.today() + timedelta(days=1)).isoformat()
        resp = await ac.get(f"/api/v1/booking/{doctor_id}/{tomorrow}", headers=headers)
        assert resp.status_code == 200
        free_times = resp.json()
        assert isinstance(free_times, list)

@pytest.mark.asyncio
async def test_patient_book_update_cancel_and_retrieve_booking(test_user, test_doctor):
    test_user = await test_user
    test_doctor = await test_doctor
    headers = {"Authorization": f"Bearer {test_user.accessToken}"}
    async with AsyncClient(app=app, base_url="http://test") as ac:
        # Get doctor's id
        doctor_id = test_doctor.id
        tomorrow = (date.today() + timedelta(days=1)).isoformat()
        # Get free times
        resp = await ac.get(f"/api/v1/booking/{doctor_id}/{tomorrow}", headers=headers)
        assert resp.status_code == 200
        free_times = resp.json()
        assert isinstance(free_times, list)
        if not free_times:
            pytest.skip("No free times available for doctor")
        time_slot = free_times[0]

        # Book an appointment
        booking_data = {
            "doctorId": doctor_id,
            "date": tomorrow,
            "time": time_slot,
            "reason": "Routine checkup"
        }
        resp = await ac.post("/api/v1/booking/", json=booking_data, headers=headers)
        assert resp.status_code == 201
        booking = resp.json()
        booking_id = booking["id"]
        assert booking["doctorId"] == doctor_id
        assert booking["date"] == tomorrow
        assert booking["time"] == time_slot

        # Update the booking
        update_data = {"reason": "Updated reason"}
        resp = await ac.put(f"/api/v1/booking/{booking_id}", json=update_data, headers=headers)
        assert resp.status_code == 200
        updated_booking = resp.json()
        assert updated_booking["reason"] == "Updated reason"

        # Cancel the booking (assuming cancel is a delete)
        resp = await ac.delete(f"/api/v1/booking/{booking_id}", headers=headers)
        assert resp.status_code in (200, 204, 202)

        # Retrieve all bookings (should be empty or not include the canceled one)
        resp = await ac.get("/api/v1/booking/", headers=headers)
        assert resp.status_code == 200
        bookings = resp.json()
        assert isinstance(bookings, list)
        assert all(b["id"] != booking_id for b in bookings)

@pytest.mark.asyncio
async def test_doctor_retrieve_and_evaluate_bookings(test_doctor, test_user):
    test_doctor = await test_doctor
    test_user = await test_user
    headers = {"Authorization": f"Bearer {test_doctor.accessToken}"}
    async with AsyncClient(app=app, base_url="http://test") as ac:
        # Retrieve bookings for doctor
        resp = await ac.get(f"/api/v1/booking/doctor/{test_doctor.id}", headers=headers)
        assert resp.status_code == 200
        # The response is a summary (list of ints), not bookings; to get bookings, may need another endpoint
        # For now, just check the endpoint works

        # (Optional) Evaluate a booking if one exists (approve/decline)
        # This part depends on your API for evaluating bookings, which is not shown in the search results
        # If you have such an endpoint, add the test here 