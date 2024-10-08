import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DoctorApplication, DoctorApplicationCreate, DoctorApplicationPopulated, DoctorApplicationUpdate } from "../../types/DoctorApplication";

export const applicationAPI = createApi({
    reducerPath: 'applicationAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/doctor-applications',
        credentials: "include",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accessToken');
            
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ['Application', 'Applications', 'MyApplication'],
    endpoints: (builder) => ({
        apply: builder.mutation<DoctorApplication, DoctorApplicationCreate>({
            query: (credential) => ({
                url: '/',
                method: 'Post',
                body: credential,
                
            }),
            invalidatesTags: ['MyApplication']
        }),
        updateApplication: builder.mutation<DoctorApplication, {update: DoctorApplicationUpdate} >({
            query: ({ update}) => ({
                url: `/`,
                method: 'Put',
                body: update,
                
            }),
            invalidatesTags: ['MyApplication']

        }),
        deleteApplication: builder.mutation<void, string >({
            query: (id) => ({
                url: `/${id}`,
                method: 'Delete'
                
            }),
            invalidatesTags: ['MyApplication']

        }),

        findMyApplication: builder.query<DoctorApplication, void>({
            query: () => ({
                url: `/current-user`,
                method: 'Get'
            }),
            providesTags: ['MyApplication']

        }),

        findOneApplication: builder.query<DoctorApplicationPopulated, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'Get'
            }),
            providesTags: ['Application']
        }),

        findAllApplications: builder.query<DoctorApplicationPopulated[], void>({
            query: () => ({
                url: '/',
                method: 'Get'
            }),
            providesTags: ['Applications']
        }),

        evaluateApplication: builder.mutation<DoctorApplication, {id: string, update: {status: string} }>({
            query: ({id, update}) => ({
                url: `/evaluate/${id}`,
                method: 'Put',
                body: update

            }),
            invalidatesTags: ['Application', 'Applications']
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
