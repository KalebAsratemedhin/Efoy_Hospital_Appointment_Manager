import { User } from "./User";

export interface Doctor extends User{
    user_id: string;
    speciality: string;
    experience: string;
    educationLevel: string;
    rating?: number;
    
}