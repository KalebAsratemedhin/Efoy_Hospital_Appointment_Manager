import { configureStore } from "@reduxjs/toolkit";
import { authAPI } from "./api/authAPI";
import authReducer from './slices/authSlice'
import { bookingAPI } from "./api/bookingAPI";
import { userAPI } from "./api/userAPI";
import { commentAPI } from "./api/commentAPI";
import { ratingAPI } from "./api/ratingAPI";
import { applicationAPI } from "./api/applicationAPI";

export const store = configureStore({
    reducer: {
        [authAPI.reducerPath]: authAPI.reducer,
        [bookingAPI.reducerPath]: bookingAPI.reducer,
        [userAPI.reducerPath]: userAPI.reducer,
        [commentAPI.reducerPath]: commentAPI.reducer,
        [ratingAPI.reducerPath]: ratingAPI.reducer,
        [applicationAPI.reducerPath]: applicationAPI.reducer,

        auth: authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
          .concat(authAPI.middleware)
          .concat(userAPI.middleware)
          .concat(bookingAPI.middleware)
          .concat(commentAPI.middleware)
          .concat(ratingAPI.middleware)
          .concat(applicationAPI.middleware)

})

export type RootState = ReturnType<typeof store.getState>
