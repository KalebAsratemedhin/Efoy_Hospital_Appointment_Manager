import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Doctor } from "../../types/User";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const doctorAPI = createApi({
  reducerPath: "doctorAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${backendUrl}/doctor`,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Doctor"],
  endpoints: (builder) => ({
    getDoctors: builder.query<Doctor[], {page?: number, limit?: number, search?: string}>({
      query: ({ page = 1, limit = 10, search }) => ({
        url: `?page=${page}&limit=${limit}${search ? `&search=${search}` : ''}`,
        method: "GET",
      }),
      providesTags: ["Doctor"],
    }),
    getDoctorById: builder.query<Doctor, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: ["Doctor"],
    }),
    updateDoctor: builder.mutation<Doctor, {id: string, update: Partial<Doctor>>>({
      query: ({id, update}) => ({
        url: `/${id}`,
        method: "PUT",
        body: update,
      }),
      invalidatesTags: ["Doctor"],
    }),
    updateWorkingHours: builder.mutation<Doctor, {id: string, workingHours: Record<string, {start: string, end: string}>}>({
      query: ({id, workingHours}) => ({
        url: `/${id}/working-hours`,
        method: "PUT",
        body: workingHours,
      }),
      invalidatesTags: ["Doctor"],
    }),
  }),
});

export const { 
  useGetDoctorsQuery, 
  useGetDoctorByIdQuery,
  useUpdateDoctorMutation,
  useUpdateWorkingHoursMutation
} = doctorAPI; 