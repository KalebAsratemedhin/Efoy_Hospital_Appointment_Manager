# Efoy Hospital Appointment Manager API Documentation

## Overview

The Efoy Hospital Appointment Manager API is a FastAPI-based REST API that provides comprehensive functionality for managing hospital appointments, doctor profiles, user authentication, and patient-doctor interactions. The API supports role-based access control with three user roles: `patient`, `doctor`, and `admin`.

## Base URL
```
http://localhost:8000/api/v1
```

## Authentication

The API uses JWT (JSON Web Token) authentication. Most endpoints require authentication via Bearer token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Common Response Formats

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {...},
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### Error Response
```json
{
  "error": "Error message",
  "detail": "Detailed error description",
  "status_code": 400,
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### Paginated Response
```json
{
  "items": [...],
  "total": 100,
  "page": 1,
  "limit": 10,
  "total_pages": 10,
  "has_next": true,
  "has_prev": false
}
```

---

## Authentication Endpoints

### POST /auth/signup
Register a new user account.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phoneNumber": "1234567890",
  "role": "patient"
}
```

**Response (201 Created):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "id": "507f1f77bcf86cd799439011",
  "role": "patient"
}
```

**Validation Rules:**
- `fullName`: Minimum 2 characters
- `email`: Valid email format
- `password`: Minimum 6 characters
- `role`: Must be one of: "patient", "doctor", "admin"
- `phoneNumber`: Optional

### POST /auth/signin
Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "id": "507f1f77bcf86cd799439011",
  "role": "patient"
}
```

### POST /auth/signout
Logout user (invalidate token).

**Response (200 OK):**
```json
{
  "message": "Successfully logged out"
}
```

### GET /auth/google/callback
Google OAuth callback endpoint (placeholder implementation).

### GET /auth/error
OAuth authentication error handler.

---

## User Management Endpoints

### GET /user/current-user
Get current authenticated user's profile.

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "fullName": "John Doe",
  "email": "john@example.com",
  "role": "patient",
  "phoneNumber": "1234567890",
  "sex": "male",
  "address": "123 Main St",
  "age": 30,
  "profilePic": "https://res.cloudinary.com/...",
  "googleId": null
}
```

### GET /user/admin-stats
Get admin dashboard statistics (Admin only).

**Headers:** `Authorization: Bearer <admin_token>`

**Response (200 OK):**
```json
{
  "doctorsCount": 25,
  "patientsCount": 150,
  "appointmentsCount": 300
}
```

### GET /user
Get paginated list of users (Admin only).

**Headers:** `Authorization: Bearer <admin_token>`

**Query Parameters:**
- `page` (int, default: 1): Page number
- `limit` (int, default: 10, max: 100): Items per page

**Response (200 OK):**
```json
{
  "items": [
    {
      "id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "patient",
      "phoneNumber": "1234567890",
      "sex": "male",
      "address": "123 Main St",
      "age": 30,
      "profilePic": "https://res.cloudinary.com/...",
      "googleId": null
    }
  ],
  "total": 150,
  "page": 1,
  "limit": 10,
  "total_pages": 15,
  "has_next": true,
  "has_prev": false
}
```

### GET /user/{id}
Get specific user by ID.

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "fullName": "John Doe",
  "email": "john@example.com",
  "role": "patient",
  "phoneNumber": "1234567890",
  "sex": "male",
  "address": "123 Main St",
  "age": 30,
  "profilePic": "https://res.cloudinary.com/...",
  "googleId": null
}
```

### PUT /user/{id}
Update user profile.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "fullName": "John Smith",
  "phoneNumber": "0987654321",
  "sex": "male",
  "address": "456 Oak Ave",
  "age": 31
}
```

**Response (200 OK):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "fullName": "John Smith",
  "email": "john@example.com",
  "role": "patient",
  "phoneNumber": "0987654321",
  "sex": "male",
  "address": "456 Oak Ave",
  "age": 31,
  "profilePic": "https://res.cloudinary.com/...",
  "googleId": null
}
```

### PUT /user/profile-pic/{id}
Upload/update user profile picture.

**Headers:** `Authorization: Bearer <token>`

**Request:** `multipart/form-data` with image file

**Response (200 OK):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "fullName": "John Doe",
  "email": "john@example.com",
  "role": "patient",
  "phoneNumber": "1234567890",
  "sex": "male",
  "address": "123 Main St",
  "age": 30,
  "profilePic": "https://res.cloudinary.com/...",
  "googleId": null
}
```

### DELETE /user/{id}
Delete user account (Admin only).

**Headers:** `Authorization: Bearer <admin_token>`

**Response (204 No Content)**

---

## Doctor Management Endpoints

### GET /doctor
Get paginated list of doctors with optional search.

**Query Parameters:**
- `page` (int, default: 1): Page number
- `limit` (int, default: 10): Items per page
- `search` (string, optional): Search term for doctor name or specialty

**Response (200 OK):**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "userId": {
      "id": "507f1f77bcf86cd799439012",
      "fullName": "Dr. Jane Smith",
      "email": "jane@hospital.com",
      "role": "doctor",
      "phoneNumber": "1234567890",
      "sex": "female",
      "address": "Hospital Address",
      "age": 35,
      "profilePic": "https://res.cloudinary.com/...",
      "googleId": null
    },
    "rating": 4.5,
    "orgID": "ORG001",
    "speciality": "Cardiology",
    "experience": "10 years",
    "educationLevel": "MD",
    "workingHours": {
      "monday": {"start": "09:00", "end": "17:00"},
      "tuesday": {"start": "09:00", "end": "17:00"},
      "wednesday": {"start": "09:00", "end": "17:00"},
      "thursday": {"start": "09:00", "end": "17:00"},
      "friday": {"start": "09:00", "end": "17:00"},
      "saturday": {"start": "09:00", "end": "13:00"},
      "sunday": {"start": "00:00", "end": "00:00"}
    },
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

### GET /doctor/{id}
Get specific doctor by ID.

**Response (200 OK):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "userId": {
    "id": "507f1f77bcf86cd799439012",
    "fullName": "Dr. Jane Smith",
    "email": "jane@hospital.com",
    "role": "doctor",
    "phoneNumber": "1234567890",
    "sex": "female",
    "address": "Hospital Address",
    "age": 35,
    "profilePic": "https://res.cloudinary.com/...",
    "googleId": null
  },
  "rating": 4.5,
  "orgID": "ORG001",
  "speciality": "Cardiology",
  "experience": "10 years",
  "educationLevel": "MD",
  "workingHours": {
    "monday": {"start": "09:00", "end": "17:00"},
    "tuesday": {"start": "09:00", "end": "17:00"},
    "wednesday": {"start": "09:00", "end": "17:00"},
    "thursday": {"start": "09:00", "end": "17:00"},
    "friday": {"start": "09:00", "end": "17:00"},
    "saturday": {"start": "09:00", "end": "13:00"},
    "sunday": {"start": "00:00", "end": "00:00"}
  },
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### PUT /doctor/{id}
Update doctor profile.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "orgID": "ORG002",
  "speciality": "Neurology",
  "experience": "15 years",
  "educationLevel": "MD, PhD",
  "rating": 4.8
}
```

**Response (200 OK):** Updated doctor object

### PUT /doctor/{id}/working-hours
Update doctor's working hours.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "monday": {"start": "08:00", "end": "16:00"},
  "tuesday": {"start": "08:00", "end": "16:00"},
  "wednesday": {"start": "08:00", "end": "16:00"},
  "thursday": {"start": "08:00", "end": "16:00"},
  "friday": {"start": "08:00", "end": "16:00"},
  "saturday": {"start": "09:00", "end": "14:00"},
  "sunday": {"start": "00:00", "end": "00:00"}
}
```

**Response (200 OK):** Updated doctor object

**Validation Rules:**
- Time format: HH:MM (24-hour)
- Start time must be before end time
- Valid days: monday, tuesday, wednesday, thursday, friday, saturday, sunday

---

## Booking/Appointment Endpoints

### GET /booking
Get current user's bookings with pagination.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page` (int, default: 1): Page number
- `limit` (int, default: 10): Items per page

**Response (200 OK):**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "patientId": {
      "id": "507f1f77bcf86cd799439012",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "patient",
      "phoneNumber": "1234567890",
      "sex": "male",
      "address": "123 Main St",
      "age": 30,
      "profilePic": "https://res.cloudinary.com/...",
      "googleId": null
    },
    "doctorId": {
      "id": "507f1f77bcf86cd799439013",
      "fullName": "Dr. Jane Smith",
      "email": "jane@hospital.com",
      "role": "doctor",
      "phoneNumber": "1234567890",
      "sex": "female",
      "address": "Hospital Address",
      "age": 35,
      "profilePic": "https://res.cloudinary.com/...",
      "googleId": null
    },
    "appointmentDate": "2024-02-15",
    "time": "14:30",
    "reason": "Regular checkup",
    "status": "confirmed",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

### GET /booking/recent
Get user's most recent booking.

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):** Single booking object

### GET /booking/doctor/{doctorId}
Get booking summary for a specific doctor.

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
[25, 30, 15, 20, 10, 5, 0]
```
*Array representing booking counts for the last 7 days*

### GET /booking/patient/{patientId}
Get booking summary for a specific patient.

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
[5, 3, 2, 1, 0, 0, 0]
```
*Array representing booking counts for the last 7 days*

### GET /booking/{doctorId}/{date}
Get available time slots for a doctor on a specific date.

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
["09:00", "09:30", "10:00", "10:30", "14:00", "14:30", "15:00"]
```

### GET /booking/{id}
Get specific booking by ID.

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):** Single booking object

### POST /booking
Create a new appointment booking.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "doctorId": "507f1f77bcf86cd799439013",
  "appointmentDate": "2024-02-15",
  "time": "14:30",
  "reason": "Regular checkup"
}
```

**Response (201 Created):** Created booking object

**Validation Rules:**
- `appointmentDate`: Cannot be in the past
- `time`: Must be in HH:MM format
- `reason`: Required field

### PUT /booking/{id}
Update an existing booking.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "appointmentDate": "2024-02-16",
  "time": "15:00",
  "reason": "Follow-up appointment"
}
```

**Response (200 OK):** Updated booking object

### DELETE /booking/{id}
Cancel/delete a booking.

**Headers:** `Authorization: Bearer <token>`

**Response (204 No Content)**

---

## Comment Endpoints

### POST /comment
Create a new comment for a doctor.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "doctorId": "507f1f77bcf86cd799439013",
  "content": "Great doctor, very professional and caring."
}
```

**Response (201 Created):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "commenterId": "507f1f77bcf86cd799439012",
  "doctorId": "507f1f77bcf86cd799439013",
  "content": "Great doctor, very professional and caring.",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### GET /comment/{doctorId}
Get all comments for a specific doctor.

**Response (200 OK):**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "commenterId": "507f1f77bcf86cd799439012",
    "doctorId": "507f1f77bcf86cd799439013",
    "content": "Great doctor, very professional and caring.",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

### PUT /comment/{id}
Update a comment.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "content": "Updated comment content"
}
```

**Response (200 OK):** Updated comment object

### DELETE /comment/{id}
Delete a comment.

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):** Deleted comment object

---

## Rating Endpoints

### POST /rating
Create a new rating for a doctor.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "doctorId": "507f1f77bcf86cd799439013",
  "value": 4.5
}
```

**Response (201 Created):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "raterId": "507f1f77bcf86cd799439012",
  "doctorId": "507f1f77bcf86cd799439013",
  "value": 4.5,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

**Validation Rules:**
- `value`: Must be between 0 and 5 (inclusive)

### GET /rating/{doctorId}
Get current user's rating for a specific doctor.

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):** Rating object or null if not rated

### GET /rating/doctor/{doctorId}/all
Get all ratings for a specific doctor.

**Response (200 OK):**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "raterId": "507f1f77bcf86cd799439012",
    "doctorId": "507f1f77bcf86cd799439013",
    "value": 4.5,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

### GET /rating/favorites
Get current user's favorite doctors (rated 4+ stars).

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
[
  {
    "doctorId": "507f1f77bcf86cd799439013",
    "rating": 4.5,
    "doctor": {
      "id": "507f1f77bcf86cd799439013",
      "fullName": "Dr. Jane Smith",
      "speciality": "Cardiology"
    }
  }
]
```

### PUT /rating/{id}
Update a rating.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "value": 5.0
}
```

**Response (200 OK):** Updated rating object

### DELETE /rating/{id}
Delete a rating.

**Headers:** `Authorization: Bearer <token>`

**Response (204 No Content)**

---

## Doctor Application Endpoints

### POST /doctor-application
Submit a doctor application.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "orgID": "ORG001",
  "speciality": "Cardiology",
  "experience": "10 years",
  "educationLevel": "MD"
}
```

**Response (201 Created):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "userId": "507f1f77bcf86cd799439012",
  "orgID": "ORG001",
  "speciality": "Cardiology",
  "experience": "10 years",
  "educationLevel": "MD",
  "status": "pending",
  "appliedAt": "2024-01-01T00:00:00Z"
}
```

### GET /doctor-application/current-user
Get current user's application.

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):** Application object or null

### GET /doctor-application/{id}
Get specific application by ID.

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):** Application object

### PUT /doctor-application
Update current user's application.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "orgID": "ORG002",
  "speciality": "Neurology",
  "experience": "15 years",
  "educationLevel": "MD, PhD"
}
```

**Response (200 OK):** Updated application object

### PUT /doctor-application/evaluate/{id}
Evaluate application (Admin only).

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "status": "approved"
}
```

**Response (200 OK):** Updated application object

**Status Options:**
- `pending`: Application under review
- `approved`: Application approved
- `rejected`: Application rejected

### GET /doctor-application
Get all applications (Admin only).

**Headers:** `Authorization: Bearer <admin_token>`

**Response (200 OK):**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "orgID": "ORG001",
    "speciality": "Cardiology",
    "experience": "10 years",
    "educationLevel": "MD",
    "status": "pending",
    "appliedAt": "2024-01-01T00:00:00Z"
  }
]
```

### DELETE /doctor-application/{id}
Delete application.

**Headers:** `Authorization: Bearer <token>`

**Response (204 No Content)**

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Invalid or missing authentication |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 422 | Unprocessable Entity - Validation error |
| 500 | Internal Server Error - Server error |

## Rate Limiting

The API implements rate limiting to prevent abuse. Limits are applied per IP address and endpoint.

## File Upload

Profile pictures are uploaded to Cloudinary and return secure URLs. Supported formats: JPG, JPEG, PNG, GIF.

## Database

The API uses MongoDB with Beanie ODM for data persistence. Collections include:
- `users` - User accounts and profiles
- `doctors` - Doctor-specific information
- `bookings` - Appointment bookings
- `comments` - Doctor reviews and comments
- `ratings` - Doctor ratings
- `doctor_applications` - Doctor application submissions

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation and sanitization
- CORS configuration
- Rate limiting
- File upload validation

## Dependencies

- FastAPI - Web framework
- Uvicorn - ASGI server
- Beanie - MongoDB ODM
- Pydantic - Data validation
- Python-Jose - JWT handling
- Passlib - Password hashing
- Cloudinary - File storage
- Python-multipart - File upload handling 