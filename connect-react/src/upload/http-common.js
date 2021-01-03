import axios from "axios";

export default axios.create({
  baseURL: "https://ec2-52-66-171-212.ap-south-1.compute.amazonaws.com:8443",
});

