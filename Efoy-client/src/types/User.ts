
export interface User{
    id: string;  // Changed from _id to id
    fullName: string;
    email: string;
    password?: string;
    phoneNumber?: string;
    age?: number;
    address?: string;
    sex?: 'male' | 'female' | 'other';  // Added literal types
    role: 'patient' | 'doctor' | 'admin';  // Added literal types
    profilePic?: string;  // Made optional
    googleId?: string;  // Added missing field
}

export interface DoctorData {
    userId: string;
    speciality: string;
    experience: string;
    educationLevel: string;
    rating?: number;
    orgID: string;  // Added missing field
    workingHours?: Record<string, {start: string, end: string}>;  // Added missing field
}

export interface Doctor extends User {
    doctorData: DoctorData;
}

export interface DoctorDataUpdate {
    speciality?: string;
    experience?: string;
    educationLevel?: string;
    orgID?: string;  // Added missing field
    workingHours?: Record<string, {start: string, end: string}>;  // Added missing field
}

export interface UserUpdate{
    fullName?: string;
    phoneNumber?: string;
    age?: number;
    address?: string;
    sex?: 'male' | 'female' | 'other';  // Added literal types
    profilePic?: string;
}

export interface SigninCredential{
    email: string;
    password: string;
}

export interface SignupCredential{
    fullName: string;
    email: string;
    password: string;
    phoneNumber?: string;  // Made optional to match backend
    role?: 'patient' | 'doctor' | 'admin';  // Added role field
}

export interface AuthResponse{
    id: string;
    role: string;
    accessToken: string;
}

export interface AdminStats{
    doctorsCount: number;
    patientsCount: number;
    appointmentsCount: number;
}

// Added pagination response types to match backend
export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
}