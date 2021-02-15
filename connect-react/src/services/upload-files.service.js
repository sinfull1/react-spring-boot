import axios from "axios";
import {API_URL} from '../settings';
import LoginApi from '../api/login.interface';
const http = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("user")
  },
  validateStatus: function (status) {
    alert("executed");
    return status < 500; // Resolve only if the status code is less than 500
  }
  
});
class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("payload", file);

    return http.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return  LoginApi.callAPI({
        url: API_URL+"/files",
        method: "GET",
       })
    
  }
  getPublishFiles() {

    return  LoginApi.callAPI({
        url: API_URL+"/getPublishFiles",
        method: "GET",
       })
  
  }
  publishFile(fileName) {
    return LoginApi.callAPI({
        url: API_URL+"/publishFile?fileName="+fileName,
        method: "GET",
       })
     
  }
  deleteFile(fileName) {
   return  LoginApi.callAPI({
        url: API_URL+"/deleteFile?fileName="+fileName,
        method: "GET",
       })
      
  }
  getDownloadView(fileName)
  {
  return LoginApi.callAPI({
        url: API_URL+"/api/downloadView?fileName="+fileName,
        method: "GET",
       });
     
  }

}

export default new UploadFilesService();
