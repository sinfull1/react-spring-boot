import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://ec2-13-233-193-175.ap-south-1.compute.amazonaws.com:8080/event";

class UserService {
  getPublicContent() {
    return axios.get (API_URL + "all", {
      headers: {
        authHeader()
      }
     });
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

export default new UserService();
