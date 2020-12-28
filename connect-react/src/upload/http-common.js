import axios from "axios";

export default axios.create({
  baseURL: "http://ec2-13-233-193-175.ap-south-1.compute.amazonaws.com:8080",
});