import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Rating } from "../../types/Rating";
import { PopulatedRating } from "../../types/Rating";


export const ratingAPI = createApi({
    reducerPath: 'ratingAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/ratings',
        credentials: "include",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accessToken');
            
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
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
        }),
        findCurrentUserFavorites: builder.query<PopulatedRating[], void>({
            query: () => ({
                url: `/favorites`,
                method: 'Get'
            })
        })

    })
})

export const {
    useCreateRatingMutation, 
    useUpdateRatingMutation,
    useDeleteRatingMutation,
    useFindCurrentUserRatingQuery,
    useFindCurrentUserFavoritesQuery

} = ratingAPI
