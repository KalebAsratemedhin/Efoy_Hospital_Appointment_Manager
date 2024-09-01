export interface User{
    _id: string;
    username: string;
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    age: number;
    address: string;
    gender: string;
    role: string;
    profilePic: string;

    favorites: string;
    followers: number;
    following: number;
}