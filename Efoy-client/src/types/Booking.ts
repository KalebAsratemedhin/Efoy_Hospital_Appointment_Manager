import { User } from "./User";

export interface Booking {
    id?: string,  // Changed from _id to id
    patientId?: string,
    doctorId?: string,
    appointmentDate: string,  // Made required
    time: string,  // Made required
    reason: string,  // Made required
    status?: string,
    created_at?: string;  // Added missing fields
    updated_at?: string;
}

export interface BookingPopulated {
    id?: string,  // Changed from _id to id
    patientId?: User,
    doctorId: User,
    appointmentDate: string,
    time: string,
    reason: string,
    status?: string,
    created_at?: string;  // Added missing fields
    updated_at?: string;
}

// Added to match backend pagination response
export interface BookingPaginatedResponse {
    items: BookingPopulated[];
    total: number;
    page: number;
    limit: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
}