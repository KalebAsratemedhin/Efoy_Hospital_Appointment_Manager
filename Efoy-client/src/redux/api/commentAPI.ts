import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CommentI } from "../../types/Comment";


export const commentAPI = createApi({
    reducerPath: 'commentAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/comments',
        credentials: "include"
    }),
    endpoints: (builder) => ({
        createComment: builder.mutation<CommentI, CommentI >({
            query: (credential) => ({
                url: '/',
                method: 'Post',
                body: credential,
                
            })
        }),
        updateComment: builder.mutation<CommentI, {id: string, update: CommentI} >({
            query: ({id, update}) => ({
                url: `/${id}`,
                method: 'Put',
                body: update,
                
            })
        }),
        deleteComment: builder.mutation<void, string >({
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
        findAllComments: builder.query<CommentI[], string>({
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
