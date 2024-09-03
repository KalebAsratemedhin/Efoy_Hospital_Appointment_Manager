import { User } from "./User";

export interface CommentI{
    _id?: string;
    commenterId?: User;
    content: string;
    doctorId: string;
}