import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/User";
import { Doctor } from "../../types/Doctor";

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
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
            query: () => ({
                url: '/doctor',
                method: 'Get'
            })
        }),

    })
})

export const {
    useFindOneDoctorQuery,
    useFindAllDoctorsQuery,

} = userAPI
