import axios from "axios";

const API_URL = "https://ec2-52-66-171-212.ap-south-1.compute.amazonaws.com:8444/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", { username, password })
      .then((response) => {
        console.log(response);
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
    return axios.post(API_URL + "register", {
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
