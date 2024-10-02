import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Doctor, User, UserUpdate } from "../../types/User";

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
        credentials: "include"
    }),
    endpoints: (builder) => ({

        findOneDoctor: builder.query<Doctor, string>({
            query: (id) => ({
                url: `/doctor/${id}`,
                method: 'Get'
            })
        }),

        findAllDoctors: builder.query<{doctors: Doctor[], totalPages: number, currentPage: number}, {page: number, limit: number}>({
            query: ({ page = 1, limit = 10 }) => ({
                url: `/doctor?page=${page}&limit=${limit}`,
                method: 'Get'
            })
        }),

        updateUser: builder.mutation<User, {id: string, update: UserUpdate}>({
            query: ({id, update}) => ({
                url: `/user/${id}`,
                method: 'Put',
                body: update,
                
            })
        }),

        updateProfilePicture: builder.mutation<User, {id: string, update: any}>({
            query: ({id, update}) => ({
                url: `/user/profile-pic/${id}`,
                method: 'Put',
                body: update,
                
            })
        }),

        searchDoctors: builder.query<Doctor[], string>({
            query: (searchTerm) => ({
               url: `/doctor?search=${searchTerm}`,
               method: 'Get'
            })
        }),


    })
})

export const {
    useFindOneDoctorQuery,
    useFindAllDoctorsQuery,
    useSearchDoctorsQuery,
    useUpdateUserMutation,
    useUpdateProfilePictureMutation



} = userAPI
