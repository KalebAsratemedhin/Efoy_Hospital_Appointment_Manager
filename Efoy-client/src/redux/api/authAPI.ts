import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SigninCredential, SignupCredential, User } from "../../types/User";

export const authAPI = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/auth',
        credentials: "include"
    }),
    endpoints: (builder) => ({
        signup: builder.mutation<User, SignupCredential >({
            query: (credential) => ({
                url: '/signup',
                method: 'Post',
                body: credential,
                
            })
        }),
        signin: builder.mutation<User, SigninCredential >({
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
        getCurrentUser: builder.query<User, void>({
            query: () => ({
                url: '/current-user',
                method: 'Get'
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
    useGetCurrentUserQuery,
    useGoogleAuthQuery
} = authAPI
