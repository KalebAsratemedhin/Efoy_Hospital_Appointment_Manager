import { User } from "./User";

export interface Application{
    _id?: string;
    speciality: string;
    experience: string;
    educationLevel: string;
    orgID: string;
    status?: string;
    appliedAt?: string; 

}

export interface DoctorApplication extends Application{
    userId: string;

}

export interface DoctorApplicationPopulated extends Application{
    userId: User;
    
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
}

