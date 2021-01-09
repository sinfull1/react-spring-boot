import axios from "axios";
import {API_URL} from '../App';
export default axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("user")
  }

});

