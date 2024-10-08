import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthResponse, SigninCredential, SignupCredential, User } from "../../types/User";

export const authAPI = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/auth',
        credentials: "include",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accessToken');
            
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({
        signup: builder.mutation<AuthResponse, SignupCredential >({
            query: (credential) => ({
                url: '/signup',
                method: 'Post',
                body: credential,
                
            })
        }),
        signin: builder.mutation<AuthResponse, SigninCredential >({
            query: (credential) => ({
                url: '/signin',
                method: 'Post',
                body: credential,
                
            })
        }),
        signout: builder.mutation<void, void >({
            query: () => ({
                url: '/signout',
                method: 'Post'
                
            })
        }),
        
        googleAuth: builder.query<void, void>({
            query: () => ({
                url: '/google'
            })
        })
        
    })
})

export const {
    useSigninMutation, 
    useSignupMutation,
    useSignoutMutation,
    useGoogleAuthQuery
} = authAPI
