import axios from 'axios'





export default async function LoginApi(username,password){

    const AUTH_API_URL = 'https://localhost:8444/'
    try {
        return axios.post(AUTH_API_URL + "login", {username,password}).then(response =>{
        if (response.data.token) {
            localStorage.setItem("user", response.data.token);
        }}

        );
       } catch (err) {
        throw err
    }
}

