import { Doctor } from "./Doctor";

export interface PopulatedRating {
    _id: string;
    raterId: string;
    value: number;
    doctorId: Doctor;

}