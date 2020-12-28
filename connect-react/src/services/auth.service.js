import axios from "axios";

const API_URL = "http://ec2-13-233-193-175.ap-south-1.compute.amazonaws.com:8001/";

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
