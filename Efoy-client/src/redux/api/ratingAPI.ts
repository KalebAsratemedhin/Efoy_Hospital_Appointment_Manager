import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Rating, PopulatedRating, FavoriteDoctor } from "../../types/Rating";
const backendUrl = import.meta.env.VITE_BACKEND_URL;


export const ratingAPI = createApi({
    reducerPath: 'ratingAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${backendUrl}/rating`,
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
        updateRating: builder.mutation<Rating, {id: string, update: Partial<Rating>} >({
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

        findCurrentUserRating: builder.query<Rating | null, string>({
            query: (doctorId) => ({
                url: `/${doctorId}`,
                method: 'Get'
            })
        }),
        findCurrentUserFavorites: builder.query<FavoriteDoctor[], void>({
            query: () => ({
                url: `/favorites`,
                method: 'Get'
            })
        }),
        // Added missing endpoint
        getDoctorRatings: builder.query<PopulatedRating[], string>({
            query: (doctorId) => ({
                url: `/doctor/${doctorId}/all`,
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
    useFindCurrentUserFavoritesQuery,
    useGetDoctorRatingsQuery
} = ratingAPI
