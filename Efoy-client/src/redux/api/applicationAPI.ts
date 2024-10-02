import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DoctorApplication, DoctorApplicationCreate, DoctorApplicationPopulated, DoctorApplicationUpdate } from "../../types/DoctorApplication";

export const applicationAPI = createApi({
    reducerPath: 'applicationAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/doctor-applications',
        credentials: "include"
    }),
    endpoints: (builder) => ({
        apply: builder.mutation<DoctorApplication, DoctorApplicationCreate>({
            query: (credential) => ({
                url: '/',
                method: 'Post',
                body: credential,
                
            })
        }),
        updateApplication: builder.mutation<DoctorApplication, {update: DoctorApplicationUpdate} >({
            query: ({ update}) => ({
                url: `/`,
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

        findMyApplication: builder.query<DoctorApplication, void>({
            query: () => ({
                url: `/current-user`,
                method: 'Get'
            })
        }),

        findOneApplication: builder.query<DoctorApplicationPopulated, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'Get'
            })
        }),

        findAllApplications: builder.query<DoctorApplicationPopulated[], void>({
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
    useFindOneApplicationQuery,
    useFindAllApplicationsQuery,
    useEvaluateApplicationMutation

} = applicationAPI
