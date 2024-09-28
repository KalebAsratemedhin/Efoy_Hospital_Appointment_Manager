export interface DoctorApplication{
    _id?: string;
    userId?: string;
    speciality: string;
    experience: string;
    educationLevel: string;
    orgID: string;
    status?: string;
    appliedAt?: string; 

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

