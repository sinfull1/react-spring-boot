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
        async login(state, action) {
            const { username, password } = action.payload
            const response=  await LoginApi(username, password);
            response.then(res=>{
                console.log(res);
            })
        },
        logout(state, action) {
            localStorage.removeItem("user");
        }
    }
})

export const { login, logout} = authSlice.actions;

export default authSlice.reducer;