# Efoy Hospital Appointment Manager - FastAPI Backend

## Setup

1. **Clone the repository**
2. **Create a virtual environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```
4. **Configure environment variables**
   - Copy `.env-example` to `.env` and fill in your values.

5. **Run the app**
   ```bash
   uvicorn app.main:app --reload
   ```

## Docker

1. **Build the Docker image**
   ```bash
   docker build -t efoy-fastapi .
   ```
2. **Run the container**
   ```bash
   docker run --env-file .env -p 8000:8000 efoy-fastapi
   ```

## Docker Compose (Recommended)

1. **Start all services (FastAPI + MongoDB)**
   ```bash
   docker-compose up --build
   ```
2. **Stop all services**
   ```bash
   docker-compose down
   ```

## API Documentation

- **Swagger UI** is available at [http://localhost:8000/docs](http://localhost:8000/docs) for interactive API testing.
- **ReDoc** is available at [http://localhost:8000/redoc](http://localhost:8000/redoc).

## Project Structure

- `app/` - Main FastAPI application code
- `app/api/v1/endpoints/` - API route handlers
- `app/db/models/` - Beanie ODM models
- `app/schemas/` - Pydantic schemas
- `app/core/` - Config, security, and integrations

## Notes
- Uses MongoDB via Beanie ODM
- Cloudinary for file uploads
- JWT for authentication 