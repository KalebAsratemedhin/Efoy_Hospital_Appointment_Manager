from fastapi import FastAPI
from app.api.v1.endpoints import user, booking, auth, doctor, doctor_application, comment, rating
from app.db.session import initiate_database
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings

settings = get_settings()

app = FastAPI(title="Efoy Hospital Appointment Manager API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.CLIENT_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def on_startup():
    await initiate_database()

app.include_router(user.router, prefix="/api/v1/user", tags=["User"])
app.include_router(booking.router, prefix="/api/v1/booking", tags=["Booking"])
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(doctor.router, prefix="/api/v1/doctor", tags=["Doctor"])
app.include_router(doctor_application.router, prefix="/api/v1/doctor-application", tags=["DoctorApplication"])
app.include_router(comment.router, prefix="/api/v1/comment", tags=["Comment"])
app.include_router(rating.router, prefix="/api/v1/rating", tags=["Rating"]) 