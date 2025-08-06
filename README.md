# Efoy Hospital Appointment Manager

A modern, full-stack hospital appointment management system designed to streamline doctor-patient interactions, appointment scheduling, and healthcare administration. Built with **FastAPI** (Python) for the backend and **React + Vite + TypeScript** for the frontend.

---

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Backend Setup (FastAPI)](#backend-setup-fastapi)
  - [Frontend Setup (React + Vite)](#frontend-setup-react--vite)
  - [Docker Compose (Recommended)](#docker-compose-recommended)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Main Screens & Functionality](#main-screens--functionality)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **User Authentication**: JWT-based, supports patients, doctors, and admins
- **Doctor & Patient Dashboards**: Role-based dashboards with analytics, reminders, and quick actions
- **Appointment Booking**: Real-time slot availability, booking, and management
- **Doctor Applications**: Doctors can apply, admins can review and approve
- **Ratings & Comments**: Patients can rate and comment on doctors
- **Profile Management**: Update info, upload profile pictures (Cloudinary)
- **Admin Panel**: Manage users, doctors, and system analytics
- **Responsive UI**: Modern, mobile-friendly design
- **API Rate Limiting & Security**: Robust validation, role-based access, and rate limiting

---

## Architecture
```
[ React + Vite Frontend ]  <---->  [ FastAPI Backend ]  <---->  [ MongoDB ]
```
- **Frontend**: React, Redux Toolkit, TailwindCSS, Chart.js, FullCalendar, etc.
- **Backend**: FastAPI, Beanie ODM, MongoDB, Pydantic, Cloudinary, JWT
- **Containerization**: Docker & Docker Compose for local development

---

## Tech Stack
- **Frontend**: React 18, Vite, TypeScript, Redux Toolkit, TailwindCSS, Chart.js, FullCalendar, Framer Motion
- **Backend**: FastAPI, Beanie (MongoDB ODM), Pydantic, Uvicorn, Cloudinary, JWT, Pytest
- **Database**: MongoDB
- **DevOps**: Docker, Docker Compose

---

## Getting Started

### Backend Setup (FastAPI)
1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd Efoy_Hospital_Appointment_Manager/server
   ```
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

### Frontend Setup (React + Vite)
1. **Install dependencies**
   ```bash
   cd ../Efoy-client
   npm install
   ```
2. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000)

### Docker Compose (Recommended)
Run both backend and MongoDB with one command:
```bash
cd server
docker-compose up --build
```
- FastAPI: [http://localhost:8000](http://localhost:8000)
- MongoDB: [localhost:27017](localhost:27017)

---

## Environment Variables
- **Backend**: See `server/.env-example` for required variables (MongoDB URI, JWT secret, Cloudinary, etc.)
- **Frontend**: Add any required API URLs or keys to `.env` in `Efoy-client` if needed

---

## API Overview
- **Base URL**: `http://localhost:8000/api/v1`
- **Authentication**: JWT Bearer tokens
- **Rate Limiting**: 60 req/min, 1000 req/hour
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

### Key Endpoints
- `POST /auth/signup` – Register user (patient/doctor)
- `POST /auth/signin` – Login
- `GET /user/current-user` – Get current user info
- `GET /doctor/` – List/search doctors
- `POST /booking/` – Book appointment
- `GET /booking/` – List user bookings
- `POST /rating/` – Rate a doctor
- `POST /comment/` – Comment on a doctor
- `POST /doctor-application/` – Apply as doctor
- `PUT /user/{id}` – Update user info
- ...and more (see [API Documentation](server/app/docs/API_DOCUMENTATION.md))

---

## Main Screens & Functionality
### Frontend
- **Landing Page**: Welcome, about, contact
- **Auth**: Signup, Signin, Google OAuth, Email Verification
- **Dashboards**:
  - **Patient**: Bookings, favorites, reminders, reports
  - **Doctor**: Appointments, stats, profile, reminders
  - **Admin**: System stats, manage doctors, reports, user management
- **Doctors**: Search, view details, book, rate, comment
- **Appointments**: List, details, calendar view
- **Settings**: Profile, preferences, profile picture
- **Error Handling**: User-friendly error and loading states

### Backend
- **Role-based Access**: Patients, doctors, admins
- **Secure File Uploads**: Profile pictures (Cloudinary)
- **Database Indexes**: Optimized for performance
- **Comprehensive Validation**: Pydantic schemas
- **Rate Limiting & Security**: Prevents abuse

---

## Testing
- **Backend**: Run tests with
  ```bash
  cd server
  pytest app/tests/ -v
  ```
- **Frontend**: Add tests as needed (Jest/React Testing Library recommended)

---

## Contributing
1. Fork the repo & create a feature branch
2. Make your changes (with clear commits)
3. Add/Update tests as needed
4. Open a Pull Request with a clear description

---

## License
This project is licensed under the MIT License.
