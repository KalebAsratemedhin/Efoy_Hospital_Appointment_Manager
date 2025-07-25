import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Booking, BookingPopulated, BookingPaginatedResponse } from "../../types/Booking";
const backendUrl = import.meta.env.VITE_BACKEND_URL;


export const bookingAPI = createApi({
    reducerPath: 'bookingAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${backendUrl}/booking`,
        credentials: "include",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accessToken');
            
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ['MyBookings', 'Booking'],
    endpoints: (builder) => ({
        createBooking: builder.mutation<BookingPopulated, Booking >({
            query: (credential) => ({
                url: '/',
                method: 'Post',
                body: credential,
                
            }),
            invalidatesTags: ['MyBookings']
        }),
        updateBooking: builder.mutation<BookingPopulated, {id: string, update: Partial<Booking>} >({
            query: ({id, update}) => ({
                url: `/${id}`,
                method: 'Put',
                body: update,
                
            }),
            invalidatesTags: ['MyBookings', 'Booking']

        }),
        deleteBooking: builder.mutation<void, string >({
            query: (id) => ({
                url: `/${id}`,
                method: 'Delete'
                
            })
        }),

        findRecentBooking: builder.query<BookingPopulated, void>({
            query: () => ({
                url: `/recent`,
                method: 'Get'
            })
        }),

        findOneBooking: builder.query<BookingPopulated, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'Get'
            }),
            providesTags: ['Booking']
        }),

        findCurrentUserBookings: builder.query<BookingPaginatedResponse, {page: number, limit: number}>({
            query: ({ page = 1, limit = 10 }) => ({
                url: `?page=${page}&limit=${limit}`,
                method: 'Get'
            }),
            providesTags: ['MyBookings']
        }),
        findAvailableTimeSlots: builder.query<string[], {doctorId: string, date: string}>({
            query: ({doctorId, date}) => ({
                url: `/${doctorId}/${date}`,
                method: 'Get'
            })
        }),
        findPatientSummary: builder.query<number[], string>({
            query: (patientId) => ({
                url: `/patient/${patientId}`,
                method: 'Get'
            })
        }),
        findDoctorSummary: builder.query<number[], string>({
            query: (doctorId) => ({
                url: `/doctor/${doctorId}`,
                method: 'Get'
            })
        }),

    })
})

export const {
    useCreateBookingMutation, 
    useUpdateBookingMutation,
    useDeleteBookingMutation,
    useFindCurrentUserBookingsQuery,
    useFindOneBookingQuery,
    useFindRecentBookingQuery,
    useFindAvailableTimeSlotsQuery,
    useFindPatientSummaryQuery,
    useFindDoctorSummaryQuery

} = bookingAPI
