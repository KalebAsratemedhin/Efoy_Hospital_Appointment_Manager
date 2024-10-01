import { DoctorData, User } from "./User";

export interface Booking {
    _id?: string,
    patientId?: string,
    doctorId?: string,
    appointmentDate: string,
    time?: string,
    reason?: string,
    status?: string,
    
}

export interface BookingPopulated {
    _id?: string,
    patientId?: User,
    doctorId: User,
    appointmentDate: string,
    time: string,
    reason: string,
    status?: string,
    doctorData: DoctorData
}