from fastapi import FastAPI
from app.api.v1.endpoints import user
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