import { User } from "./User";

export interface Application{
    id?: string;  // Changed from _id to id
    speciality: string;
    experience: string;
    educationLevel: string;
    orgID: string;
    status?: 'pending' | 'approved' | 'rejected';  // Added literal types
    appliedAt?: string; 
}

export interface DoctorApplication extends Application{
    userId: string;
}

export interface DoctorApplicationPopulated extends Application{
    userId: User;  // Changed to User type
}

export interface DoctorApplicationCreate{
    speciality: string;
    experience: string;
    educationLevel: string;
    orgID: string;
}

export interface DoctorApplicationUpdate{
    speciality?: string;
    experience?: string;
    educationLevel?: string;
    orgID?: string;
    status?: 'pending' | 'approved' | 'rejected';  // Added status field
}

