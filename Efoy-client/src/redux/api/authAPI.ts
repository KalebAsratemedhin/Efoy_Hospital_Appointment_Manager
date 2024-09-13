import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/User";
import { SignupCredential } from "../../types/SignupCredential";
import { SigninCredential } from "../../types/SigninCredential";

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
        updateCurrentUser: builder.mutation<User, User >({
            query: () => ({
                url: '/user/profile',
                method: 'Post'
                
            })
        }),
    })
})

export const {
    useSigninMutation, 
    useSignupMutation,
    useSignoutMutation,
    useGetCurrentUserQuery,
    useUpdateCurrentUserMutation
} = authAPI
