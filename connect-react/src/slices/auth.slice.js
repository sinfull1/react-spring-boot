import { createSlice } from '@reduxjs/toolkit'
import LoginApi from "../api/login.interface";
import {useDispatch} from "react-redux";
let initialState =  {
   username: "",
   password:"",
   token:"",
   message:""
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action) {
           localStorage.setItem("user",action.payload.token) ;
           return {
               username: action.payload.username,
               token: action.payload.token
           }
        },
        logout(state, action) {
            localStorage.removeItem("user");
        },
        registerSuccess(state,action) {
            state.message ="Succesfull";
        }
    }
})

export const { setToken, logout} = authSlice.actions;

export default authSlice.reducer;