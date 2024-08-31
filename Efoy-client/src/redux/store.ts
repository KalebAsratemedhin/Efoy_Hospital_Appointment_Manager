import { configureStore } from "@reduxjs/toolkit";
import { authAPI } from "./api/authAPI";
import authReducer from './slices/authSlice'

export const store = configureStore({
    reducer: {
        [authAPI.reducerPath]: authAPI.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
          .concat(authAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>
