import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/User";
import { SignupCredential } from "../../types/SignupCredential";
import { SigninCredential } from "../../types/SigninCredential";

export const authAPI = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        credentials: "include"
    }),
    endpoints: (builder) => ({
        signup: builder.mutation<User, SignupCredential >({
            query: (credential) => ({
                url: '/auth/signup',
                method: 'Post',
                body: credential,
                
            })
        }),
        signin: builder.mutation<User, SigninCredential >({
            query: (credential) => ({
                url: '/auth/signin',
                method: 'Post',
                body: credential,
                
            })
        }),
        signout: builder.mutation<void, void >({
            query: () => ({
                url: '/auth/signout',
                method: 'Post'
                
            })
        }),
        getCurrentUser: builder.query<User, void>({
            query: () => ({
                url: '/auth/current-user',
                method: 'Get'
            })
        })
    })
})

export const {
    useSigninMutation, 
    useSignupMutation,
    useSignoutMutation,
    useGetCurrentUserQuery,
} = authAPI
