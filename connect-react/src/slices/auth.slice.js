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
            state.message = "Registation Succefull";
        }
    }
})

export const { reload, setToken, logout, setMessage} = authSlice.actions;

export default authSlice.reducer;