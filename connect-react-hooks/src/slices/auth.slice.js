import { createSlice } from '@reduxjs/toolkit'
import LoginApi from "../api/login.interface";
let initialState =  {
   username: "",
   password:"",
   token:""
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            const { username, password } = action.payload
            state.token = LoginApi(username, password);
        }
    }
})

export const { login} = authSlice.actions;

export default authSlice.reducer;