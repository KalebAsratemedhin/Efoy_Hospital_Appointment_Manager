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

        findAllDoctors: builder.query<Doctor[], void>({
            query: (user) => ({
                url: '/doctor',
                method: 'Get',
                body: user
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


    })
})

export const {
    useFindOneDoctorQuery,
    useFindAllDoctorsQuery,
    useUpdateUserMutation,
    useUpdateProfilePictureMutation



} = userAPI
