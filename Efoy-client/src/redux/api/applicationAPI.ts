import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DoctorApplication, DoctorApplicationUpdate } from "../../types/DoctorApplication";

export const applicationAPI = createApi({
    reducerPath: 'applicationAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/doctor-applications',
        credentials: "include"
    }),
    endpoints: (builder) => ({
        apply: builder.mutation<DoctorApplication, DoctorApplication>({
            query: (credential) => ({
                url: '/',
                method: 'Post',
                body: credential,
                
            })
        }),
        updateApplication: builder.mutation<DoctorApplication, {id: string, update: DoctorApplicationUpdate} >({
            query: ({id, update}) => ({
                url: `/${id}`,
                method: 'Put',
                body: update,
                
            })
        }),
        deleteApplication: builder.mutation<void, string >({
            query: (id) => ({
                url: `/${id}`,
                method: 'Delete'
                
            })
        }),

        findMyApplication: builder.query<DoctorApplication, string>({
            query: (userId) => ({
                url: `/current-user/${userId}`,
                method: 'Get'
            })
        }),

        findAllApplications: builder.query<DoctorApplication[], void>({
            query: () => ({
                url: '/',
                method: 'Get'
            })
        }),

        evaluateApplication: builder.mutation<DoctorApplication, {id: string, update: {status: string} }>({
            query: ({id, update}) => ({
                url: `/evaluate/${id}`,
                method: 'Put',
                body: update

            })
        })
        

    })
})

export const {
    useApplyMutation, 
    useUpdateApplicationMutation,
    useDeleteApplicationMutation,
    useFindMyApplicationQuery,
    useFindAllApplicationsQuery,
    useEvaluateApplicationMutation

} = applicationAPI
