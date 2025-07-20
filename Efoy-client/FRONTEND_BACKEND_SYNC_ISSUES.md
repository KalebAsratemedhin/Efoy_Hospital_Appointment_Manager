# Frontend-Backend Synchronization Issues Analysis

## Critical Issues Found

### 1. **API Base URL Inconsistencies**

**Issue:** Different API files use different base URL patterns
- `authAPI.ts`: `${backendUrl}/auth` ✅ (Correct)
- `userAPI.ts`: `${backendUrl}` ✅ (Correct) 
- `bookingAPI.ts`: `${backendUrl}/booking` ✅ (Correct)
- `commentAPI.ts`: `${backendUrl}/comment` ✅ (Correct)
- `ratingAPI.ts`: `${backendUrl}/rating` ✅ (Correct)
- `applicationAPI.ts`: `${backendUrl}/doctor-application` ✅ (Correct)
- `doctorAPI.ts`: `${backendUrl}/api` ❌ (INCORRECT)

**Backend API Structure:**
```
/api/v1/auth
/api/v1/user
/api/v1/doctor
/api/v1/booking
/api/v1/comment
/api/v1/rating
/api/v1/doctor-application
```

**Fix Required:** Update `doctorAPI.ts` to use correct base URL

### 2. **Type Definition Mismatches**

#### User Interface Issues:
**Frontend (`User.ts`):**
```typescript
export interface User{
    _id: string;  // ❌ Should be 'id'
    fullName: string;
    email: string;
    password?: string;
    phoneNumber?: string;
    age?: number;
    address?: string;
    sex?: string;  // ❌ Should be Literal type
    role: string;  // ❌ Should be Literal type
    profilePic: string;  // ❌ Should be optional
}
```

**Backend Schema:**
```python
class UserOut(BaseModel):
    id: str  # ✅ Uses 'id'
    fullName: str
    email: EmailStr
    role: Literal['patient', 'doctor', 'admin']  # ✅ Literal type
    phoneNumber: Optional[str] = None
    sex: Optional[Literal['male', 'female', 'other']]  # ✅ Literal type
    address: Optional[str] = None
    age: Optional[int] = Field(default=None, ge=0)
    profilePic: Optional[str] = None  # ✅ Optional
    googleId: Optional[str] = None
```

#### Booking Interface Issues:
**Frontend (`Booking.ts`):**
```typescript
export interface Booking {
    _id?: string,  // ❌ Should be 'id'
    patientId?: string,
    doctorId?: string,
    appointmentDate?: string,  // ❌ Should be required
    time?: string,  // ❌ Should be required
    reason?: string,  // ❌ Should be required
    status?: string,  // ❌ Should be required
}
```

**Backend Schema:**
```python
class BookingOut(BaseModel):
    id: str  # ✅ Uses 'id'
    patientId: UserOut  # ✅ Populated user object
    doctorId: UserOut  # ✅ Populated user object
    appointmentDate: date  # ✅ Required
    time: str  # ✅ Required
    reason: str  # ✅ Required
    status: str  # ✅ Required
    created_at: Optional[datetime]
    updated_at: Optional[datetime]
```

#### Comment Interface Issues:
**Frontend (`Comment.ts`):**
```typescript
export interface CommentI{
    _id?: string;  // ❌ Should be 'id'
    commenterId?: User;  // ❌ Should be string in create
    content: string;
    doctorId: string;
}
```

**Backend Schema:**
```python
class CommentOut(BaseModel):
    id: str  # ✅ Uses 'id'
    commenterId: str  # ✅ String ID
    doctorId: str  # ✅ String ID
    content: str
    created_at: Optional[datetime]
    updated_at: Optional[datetime]
```

#### Rating Interface Issues:
**Frontend (`Rating.ts`):**
```typescript
export interface Rating{
    _id?: string;  // ❌ Should be 'id'
    raterId?: string;
    value: number;
    doctorId?: string;
}
```

**Backend Schema:**
```python
class RatingOut(BaseModel):
    id: str  # ✅ Uses 'id'
    raterId: str  # ✅ String ID
    doctorId: str  # ✅ String ID
    value: float  # ✅ Float type
    created_at: Optional[datetime]
    updated_at: Optional[datetime]
```

### 3. **Missing API Endpoints**

#### Doctor API Issues:
**Frontend Missing:**
- `PUT /doctor/{id}` - Update doctor profile
- `PUT /doctor/{id}/working-hours` - Update working hours
- Search functionality with query parameters

**Backend Available:**
- `GET /doctor` - With search and pagination
- `GET /doctor/{id}` - Get specific doctor
- `PUT /doctor/{id}` - Update doctor profile
- `PUT /doctor/{id}/working-hours` - Update working hours

#### User API Issues:
**Frontend Missing:**
- `GET /user` - Get all users (admin only)
- `DELETE /user/{id}` - Delete user (admin only)

#### Booking API Issues:
**Frontend Missing:**
- Proper pagination response handling
- `GET /booking/{doctorId}/{date}` - Available time slots

#### Rating API Issues:
**Frontend Missing:**
- `GET /rating/doctor/{doctorId}/all` - Get all ratings for doctor

### 4. **Authentication Issues**

#### Signup Form Issues:
**Frontend (`signup.tsx`):**
```typescript
interface FormData {
  password: string;
  fullName: string;
  email: string;
  phoneNumber: string;  // ❌ Required in frontend, optional in backend
  speciality?: string;  // ❌ Not part of signup
  orgID?: string;       // ❌ Not part of signup
  experience?: string;  // ❌ Not part of signup
  educationLevel?: string; // ❌ Not part of signup
}
```

**Backend Signup Schema:**
```python
class AuthSignup(BaseModel):
    fullName: str = Field(..., min_length=2)
    email: EmailStr
    password: str = Field(..., min_length=6)
    phoneNumber: Optional[str]  # ✅ Optional
    role: str = Field(default="patient", pattern='^(patient|doctor|admin)$')
```

#### Missing Role Selection:
- Frontend doesn't allow role selection during signup
- Backend expects role field with validation

### 5. **Response Handling Issues**

#### Pagination Response Mismatch:
**Frontend Expects:**
```typescript
{
  doctors: Doctor[],
  totalPages: number,
  currentPage: number
}
```

**Backend Returns:**
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

### 6. **File Upload Issues**

#### Profile Picture Upload:
**Frontend (`userAPI.ts`):**
```typescript
updateProfilePicture: builder.mutation<User, {id: string, update: any}>({
    query: ({id, update}) => ({
        url: `/user/profile-pic/${id}`,
        method: 'Put',
        body: update,  // ❌ Should be FormData
    })
})
```

**Backend Expects:**
- `multipart/form-data` with file
- Proper file validation

### 7. **Missing Error Handling**

- Frontend doesn't handle all backend error responses properly
- Missing validation error handling
- Missing rate limiting error handling

## Required Fixes

### 1. Fix API Base URLs
- Update `doctorAPI.ts` to use correct base URL
- Ensure all APIs use consistent URL structure

### 2. Update Type Definitions
- Change `_id` to `id` in all interfaces
- Add proper literal types for `role` and `sex`
- Make `profilePic` optional
- Add missing required fields
- Add proper datetime types

### 3. Fix API Endpoints
- Add missing doctor update endpoints
- Add missing user management endpoints
- Add proper search functionality
- Add missing rating endpoints

### 4. Fix Authentication
- Add role selection to signup form
- Make phoneNumber optional in signup
- Remove doctor-specific fields from signup

### 5. Fix Response Handling
- Update pagination response handling
- Add proper error handling
- Add loading states

### 6. Fix File Upload
- Implement proper FormData handling
- Add file validation
- Add upload progress

### 7. Add Missing Features
- Implement proper search functionality
- Add admin-only features
- Add proper validation error handling

## Priority Order

1. **HIGH PRIORITY:** Fix API base URLs and type definitions
2. **HIGH PRIORITY:** Fix authentication and signup flow
3. **MEDIUM PRIORITY:** Add missing API endpoints
4. **MEDIUM PRIORITY:** Fix response handling
5. **LOW PRIORITY:** Add advanced features and error handling 