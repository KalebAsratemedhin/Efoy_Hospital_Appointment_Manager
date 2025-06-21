import { Doctor } from "./User";

export interface Rating{
    _id?: string;
    raterId?: string;
    value: number;
    doctorId?: string;
}


export interface PopulatedRating {
    _id: string;
    raterId: string;
    value: number;
    doctorId: Doctor;

}