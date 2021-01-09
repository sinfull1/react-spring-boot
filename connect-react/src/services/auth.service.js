import axios from "axios";

import {AUTH_API_URL} from '../settings';

class AuthService {
  login(username, password) {
    return axios
      .post(AUTH_API_URL + "login", { username, password })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", response.data.token);
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(AUTH_API_URL + "register", {
      username,
      email,
      password,
    });
  }
  isLoggedIn() {
   if( localStorage.getItem("user")) return true
   else return false;

  }


}

export default new AuthService();
