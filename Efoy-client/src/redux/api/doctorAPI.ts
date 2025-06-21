import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Doctor } from "../../types/User";

export const doctorAPI = createApi({
  reducerPath: "doctorAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api`,
    credentials: "include",
  }),
  tagTypes: ["Doctor"],
  endpoints: (builder) => ({
    getDoctors: builder.query<Doctor[], void>({
      query: () => ({
        url: "/doctors",
        method: "GET",
      }),
      providesTags: ["Doctor"],
    }),
    getDoctorById: builder.query<Doctor, string>({
      query: (id) => ({
        url: `/doctors/${id}`,
        method: "GET",
      }),
      providesTags: ["Doctor"],
    }),
  }),
});

export const { useGetDoctorsQuery, useGetDoctorByIdQuery } = doctorAPI; 