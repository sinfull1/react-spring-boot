import axios from 'axios'





export default async  function LoginApi(username,password){

    const AUTH_API_URL = 'https://localhost:8444/'
    try {
        const response = await axios.post(AUTH_API_URL + "logintest", {username,password});
        console.log("here",response);
        if (response.data.token) {
            localStorage.setItem("user", response.data.token);
        }
        return response.data.token;


    } catch (err) {
        throw err
    }
}

