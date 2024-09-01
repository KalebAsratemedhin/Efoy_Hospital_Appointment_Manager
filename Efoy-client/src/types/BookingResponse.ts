import { Doctor } from "./Doctor";
import { Patient } from "./Patient";

export interface BookingResponse {
    _id?: string,
    patientId?: Patient,
    doctorId: Doctor,
    appointmentDate: string,
    time: string,
    reason: string,
    status?: string,
}