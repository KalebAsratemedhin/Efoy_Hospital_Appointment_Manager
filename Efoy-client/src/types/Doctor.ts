import { User } from "./User";

export interface Doctor extends User{
    speciality: string;
    experience: string;
    educationLevel: string;
    
}