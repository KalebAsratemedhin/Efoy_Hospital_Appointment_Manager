import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState{
    id: string | null;
    role: string | null;

}

const initialState = {id: null, role: null} as AuthState

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action){
            state.id = action.payload.id
            state.role = action.payload.role 
            localStorage.setItem('id', state.id as string)
            localStorage.setItem('role', state.role as string)

        },

        getAuth(state){
            state.id = localStorage.getItem('id')
            state.role = localStorage.getItem('role')

        },

        clearAuth(state){
            state.id = null
            state.role = null
            localStorage.removeItem('id')
            localStorage.removeItem('role')

        }

    }
})

export const {setAuth, clearAuth, getAuth} = authSlice.actions
export const authSelector = (state: RootState) => state.auth
export default authSlice.reducer