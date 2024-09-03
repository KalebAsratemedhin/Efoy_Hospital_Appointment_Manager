import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Rating } from "../../types/Rating";


export const ratingAPI = createApi({
    reducerPath: 'ratingAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/Ratings',
        credentials: "include"
    }),
    endpoints: (builder) => ({
        createRating: builder.mutation<Rating, Rating >({
            query: (credential) => ({
                url: '/',
                method: 'Post',
                body: credential,
                
            })
        }),
        updateRating: builder.mutation<Rating, {id: string, update: Rating} >({
            query: ({id, update}) => ({
                url: `/${id}`,
                method: 'Put',
                body: update,
                
            })
        }),
        deleteRating: builder.mutation<void, string >({
            query: (id) => ({
                url: `/${id}`,
                method: 'Delete'
                
            })
        }),

        findCurrentUserRating: builder.query<Rating, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'Get'
            })
        })

    })
})

export const {
    useCreateRatingMutation, 
    useUpdateRatingMutation,
    useDeleteRatingMutation,
    useFindCurrentUserRatingQuery

} = ratingAPI
