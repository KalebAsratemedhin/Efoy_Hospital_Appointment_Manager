
export interface User{
    _id: string;
    fullName: string;
    email: string;
    password?: string;
    phoneNumber?: string;
    age?: number;
    address?: string;
    sex?: string;
    role: string;
    profilePic: string;
   
}

export interface DoctorData {
    userId: string;
    speciality: string;
    experience: string;
    educationLevel: string;
    rating?: number;
}

export interface Doctor extends User {
    doctorData: DoctorData;
}

export interface DoctorDataUpdate {
    speciality?: string;
    experience?: string;
    educationLevel?: string;
}


export interface UserUpdate{
    fullName?: string;
    phoneNumber?: string;
    age?: number;
    address?: string;
    sex?: string;
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
    phoneNumber: string;
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