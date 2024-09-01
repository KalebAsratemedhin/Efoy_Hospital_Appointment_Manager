import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/User";
import { Booking } from "../../types/Booking";
import { BookingResponse } from "../../types/BookingResponse";

export const bookingAPI = createApi({
    reducerPath: 'bookingAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/bookings',
        credentials: "include"
    }),
    endpoints: (builder) => ({
        createBooking: builder.mutation<BookingResponse, Booking >({
            query: (credential) => ({
                url: '/',
                method: 'Post',
                body: credential,
                
            })
        }),
        updateBooking: builder.mutation<BookingResponse, {id: string, update: Booking} >({
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

        findOneBooking: builder.query<BookingResponse, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'Get'
            })
        }),

        findCurrentUserBookings: builder.query<BookingResponse[], void>({
            query: () => ({
                url: '/',
                method: 'Get'
            })
        }),
        findAvailableTimeSlots: builder.query<string[], {doctorId: string, date: string}>({
            query: ({doctorId, date}) => ({
                url: `/${doctorId}/${date}`,
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
    useFindAvailableTimeSlotsQuery

} = bookingAPI
