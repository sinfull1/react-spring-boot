import axios from "axios";

export default axios.create({
  baseURL: "https://ec2-13-126-17-155.ap-south-1.compute.amazonaws.com:8443",
});

