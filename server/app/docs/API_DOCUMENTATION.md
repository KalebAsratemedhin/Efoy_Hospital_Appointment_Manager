# Efoy Hospital Appointment Manager API Documentation

## Overview

The Efoy Hospital Appointment Manager API is a RESTful service built with FastAPI that manages hospital appointments, doctors, patients, and related functionalities.

## Base URL

```
http://localhost:8000/api/v1
```

## Authentication

The API uses JWT (JSON Web Token) authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Rate Limiting

- **Per minute**: 60 requests
- **Per hour**: 1000 requests
- **Rate limit headers**: `X-RateLimit-Remaining`, `X-RateLimit-Reset`

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

## Endpoints

### Authentication

#### POST /auth/signup
Create a new user account.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "phoneNumber": "1234567890",
  "role": "patient"
}
```

**Response:** `201 Created`
```json
{
  "accessToken": "jwt_token_here",
  "id": "user_id",
  "role": "patient"
}
```

#### POST /auth/signin
Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:** `200 OK`
```json
{
  "accessToken": "jwt_token_here",
  "id": "user_id",
  "role": "patient"
}
```

#### POST /auth/signout
Logout user (stateless JWT).

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "User logged out successfully"
}
```

### Users

#### GET /user/current-user
Get current user information.

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "id": "user_id",
  "fullName": "John Doe",
  "email": "john@example.com",
  "role": "patient",
  "phoneNumber": "1234567890",
  "sex": "male",
  "address": "123 Main St",
  "age": 30,
  "profilePic": "https://...",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

#### GET /user/
Get all users with pagination.

**Headers:** `Authorization: Bearer <token>`
**Query Parameters:**
- `page` (int, default: 1): Page number
- `limit` (int, default: 10, max: 100): Items per page

**Response:** `200 OK`
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

#### PUT /user/{id}
Update user information.

**Headers:** `Authorization: Bearer <token>`
**Request Body:**
```json
{
  "fullName": "John Doe Updated",
  "phoneNumber": "0987654321",
  "address": "456 New St"
}
```

#### PUT /user/profile-pic/{id}
Upload profile picture.

**Headers:** `Authorization: Bearer <token>`
**Content-Type:** `multipart/form-data`

**Form Data:**
- `file`: Image file (JPG, PNG, GIF, WebP, max 2MB)

### Bookings

#### GET /booking/
Get user's bookings with pagination.

**Headers:** `Authorization: Bearer <token>`
**Query Parameters:**
- `page` (int, default: 1): Page number
- `limit` (int, default: 10): Items per page

**Response:** `200 OK`
```json
{
  "items": [
    {
      "id": "booking_id",
      "patientId": "patient_id",
      "doctorId": "doctor_id",
      "appointmentDate": "2024-01-15",
      "time": "14:30",
      "reason": "Regular checkup",
      "status": "pending",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 5,
  "page": 1,
  "limit": 10,
  "total_pages": 1,
  "has_next": false,
  "has_prev": false
}
```

#### POST /booking/
Create a new booking.

**Headers:** `Authorization: Bearer <token>`
**Request Body:**
```json
{
  "doctorId": "doctor_id",
  "appointmentDate": "2024-01-15",
  "time": "14:30",
  "reason": "Regular checkup"
}
```

**Response:** `201 Created`

#### GET /booking/{doctorId}/{date}
Get available time slots for a doctor on a specific date.

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
[
  "09:00",
  "09:20",
  "09:40",
  "10:00"
]
```

### Doctors

#### GET /doctor/
Get all doctors with pagination and search.

**Query Parameters:**
- `page` (int, default: 1): Page number
- `limit` (int, default: 10): Items per page
- `search` (string, optional): Search by name or specialty

**Response:** `200 OK`
```json
{
  "doctors": [
    {
      "id": "doctor_id",
      "fullName": "Dr. Jane Smith",
      "email": "jane@hospital.com",
      "phoneNumber": "1234567890",
      "rating": 4.5,
      "speciality": "Cardiology",
      "experience": "10 years",
      "educationLevel": "MD",
      "workingHours": {
        "monday": {"start": "08:00", "end": "17:00"},
        "tuesday": {"start": "08:00", "end": "17:00"}
      }
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 10,
  "total_pages": 5,
  "has_next": true,
  "has_prev": false
}
```

#### PUT /doctor/{id}/working-hours
Update doctor's working hours.

**Headers:** `Authorization: Bearer <token>`
**Request Body:**
```json
{
  "monday": {"start": "09:00", "end": "18:00"},
  "tuesday": {"start": "09:00", "end": "18:00"}
}
```

### Ratings

#### POST /rating/
Create or update a rating for a doctor.

**Headers:** `Authorization: Bearer <token>`
**Request Body:**
```json
{
  "doctorId": "doctor_id",
  "value": 4.5
}
```

**Response:** `201 Created`

#### GET /rating/{doctorId}
Get user's rating for a specific doctor.

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "id": "rating_id",
  "doctorId": "doctor_id",
  "raterId": "user_id",
  "value": 4.5,
  "created_at": "2024-01-01T00:00:00Z"
}
```

### Comments

#### POST /comment/
Create a comment for a doctor.

**Headers:** `Authorization: Bearer <token>`
**Request Body:**
```json
{
  "doctorId": "doctor_id",
  "content": "Great doctor, very professional!"
}
```

**Response:** `201 Created`

#### GET /comment/{doctorId}
Get all comments for a doctor.

**Response:** `200 OK`
```json
[
  {
    "id": "comment_id",
    "doctorId": "doctor_id",
    "commenterId": "user_id",
    "content": "Great doctor, very professional!",
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

### Doctor Applications

#### POST /doctor-application/
Submit a doctor application.

**Headers:** `Authorization: Bearer <token>`
**Request Body:**
```json
{
  "orgID": "ORG123",
  "speciality": "Cardiology",
  "experience": "5 years",
  "educationLevel": "MD"
}
```

**Response:** `201 Created`

#### GET /doctor-application/current-user
Get current user's application.

**Headers:** `Authorization: Bearer <token>`

#### PUT /doctor-application/evaluate/{id}
Evaluate an application (Admin only).

**Headers:** `Authorization: Bearer <admin_token>`
**Request Body:**
```json
{
  "status": "approved"
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 422 | Unprocessable Entity - Validation error |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server error |

## File Upload

### Supported Formats
- **Images**: JPG, JPEG, PNG, GIF, WebP
- **Max Size**: 2MB for images, 5MB for other files

### Security
- File type validation
- File size limits
- Filename sanitization
- Path traversal protection

## Database Indexes

The following indexes are automatically created for optimal performance:

### Users Collection
- `email` (unique)
- `role`
- `googleId`
- `phoneNumber`
- `created_at`

### Bookings Collection
- `patientId`
- `doctorId`
- `appointmentDate`
- `status`
- `created_at`
- Compound: `(doctorId, appointmentDate, time)`
- Compound: `(patientId, appointmentDate)`

### Doctors Collection
- `userId`
- `speciality`
- `rating`
- `orgID`
- `created_at`
- Compound: `(speciality, rating)`

### Ratings Collection
- `raterId`
- `doctorId`
- `value`
- `created_at`
- Compound: `(doctorId, raterId)`
- Compound: `(doctorId, value)`

### Comments Collection
- `commenterId`
- `doctorId`
- `created_at`
- Compound: `(doctorId, created_at)`

### Doctor Applications Collection
- `userId`
- `status`
- `speciality`
- `appliedAt`
- `created_at`
- Compound: `(status, appliedAt)`

## Performance Considerations

1. **Pagination**: All list endpoints support pagination
2. **Caching**: In-memory caching for frequently accessed data
3. **Database Transactions**: Used for critical operations like booking creation
4. **Rate Limiting**: Protects against API abuse
5. **Indexes**: Optimized database queries

## Security Features

1. **JWT Authentication**: Secure token-based authentication
2. **Role-based Access Control**: Different permissions for patients, doctors, and admins
3. **Input Validation**: Comprehensive validation using Pydantic
4. **File Upload Security**: Type and size validation
5. **Rate Limiting**: Protection against abuse
6. **Error Handling**: No sensitive information in error messages

## Development Setup

1. Install dependencies: `pip install -r requirements.txt`
2. Set environment variables in `.env` file
3. Run database migrations (indexes are created automatically)
4. Start the server: `uvicorn app.main:app --reload`

## Testing

Run tests with pytest:
```bash
pytest tests/ -v
```

## Monitoring

- Application logs are available in the console
- Database query performance can be monitored
- Rate limiting logs show abuse attempts
- Error logs capture all exceptions 