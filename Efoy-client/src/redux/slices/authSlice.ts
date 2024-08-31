import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState{
    username: string | null;
    token: string | null;
    role: string | null;
    
}

const initialState = {username: null, token: null} as AuthState

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action){
            state.username = action.payload.username 
            state.role = action.payload.role 
            localStorage.setItem('username', state.username as string)
            localStorage.setItem('role', state.role as string)

        },

        getAuth(state){
            state.username = localStorage.getItem('username')
            state.role = localStorage.getItem('role')

        },

        clearAuth(state){
            state.username = null
            state.role = null
            localStorage.removeItem('username')
            localStorage.removeItem('role')

        }

    }
})

export const {setAuth, clearAuth, getAuth} = authSlice.actions
export const authSelector = (state: RootState) => state.auth
export default authSlice.reducer