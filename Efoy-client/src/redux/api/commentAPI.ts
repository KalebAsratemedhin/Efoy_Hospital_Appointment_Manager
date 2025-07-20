import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CommentI, CommentPopulated } from "../../types/Comment";
const backendUrl = import.meta.env.VITE_BACKEND_URL;


export const commentAPI = createApi({
    reducerPath: 'commentAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${backendUrl}/comment`,
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
        createComment: builder.mutation<CommentI, {doctorId: string, content: string} >({
            query: (credential) => ({
                url: '/',
                method: 'Post',
                body: credential,
                
            })
        }),
        updateComment: builder.mutation<CommentI, {id: string, update: {content: string}} >({
            query: ({id, update}) => ({
                url: `/${id}`,
                method: 'Put',
                body: update,
                
            })
        }),
        deleteComment: builder.mutation<CommentI, string >({
            query: (id) => ({
                url: `/${id}`,
                method: 'Delete'
                
            })
        }),

        findOneComment: builder.query<CommentI, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'Get'
            })
        }),

        findCurrentUserComments: builder.query<CommentI[], void>({
            query: () => ({
                url: '/',
                method: 'Get'
            })
        }),
        findAllComments: builder.query<CommentPopulated[], string>({
            query: (doctorId) => ({
                url: `/${doctorId}`,
                method: 'Get'
            })
        })

    })
})

export const {
    useCreateCommentMutation, 
    useUpdateCommentMutation,
    useDeleteCommentMutation,
    useFindCurrentUserCommentsQuery,
    useFindAllCommentsQuery,

} = commentAPI
