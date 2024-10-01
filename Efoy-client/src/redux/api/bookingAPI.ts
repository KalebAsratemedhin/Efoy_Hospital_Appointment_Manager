import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/User";
import { Booking, BookingPopulated } from "../../types/Booking";

export const bookingAPI = createApi({
    reducerPath: 'bookingAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/bookings',
        credentials: "include"
    }),
    endpoints: (builder) => ({
        createBooking: builder.mutation<BookingPopulated, Booking >({
            query: (credential) => ({
                url: '/',
                method: 'Post',
                body: credential,
                
            })
        }),
        updateBooking: builder.mutation<BookingPopulated, {id: string, update: Booking} >({
            query: ({id, update}) => ({
                url: `/${id}`,
                method: 'Put',
                body: update,
                
            })
        }),
        deleteBooking: builder.mutation<void, string >({
            query: (id) => ({
                url: `/${id}`,
                method: 'Delete'
                
            })
        }),

        findRecentBooking: builder.query<Booking, void>({
            query: () => ({
                url: `/recent`,
                method: 'Get'
            })
        }),

        findOneBooking: builder.query<BookingPopulated, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'Get'
            })
        }),

        findCurrentUserBookings: builder.query<{bookings: BookingPopulated[], totalPages: number, currentPage: number}, {page: number, limit: number}>({
            query: ({ page = 1, limit = 10 }) => ({
                url: `?page=${page}&limit=${limit}`,
                method: 'Get'
            })
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
