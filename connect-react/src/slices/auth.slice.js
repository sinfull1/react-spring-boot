import { createSlice } from '@reduxjs/toolkit'
import LoginApi from "../api/login.interface";
import {useDispatch} from "react-redux";
let initialState =  {
   username: "",
   password:"",
   token:"",
   loading: false,
   message:"Please Login"
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action) {
           localStorage.setItem("user",action.payload.token) ;
           localStorage.setItem("name",action.payload.username) ;
           return {
               username: action.payload.username,
               token: action.payload.token
           }
        },
        logout(state, action) {
            localStorage.removeItem("user");
            localStorage.removeItem("name");
        },
        reload(state,action) {
            window.location.reload();
        },
        setMessage(state, action){
            state.message = action.payload.message;
            state.loading = action.payload.loading;
        }
    }
})

export const { reload, setToken, logout, setMessage} = authSlice.actions;

export default authSlice.reducer;