import axios from "axios";

const http = axios.create({
  baseURL: "https://ec2-13-126-17-155.ap-south-1.compute.amazonaws.com:8443",
});

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("payload", file);

    return http.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return http.get("/files");
  }
  getPublishFiles() {
    return http.get("/getPublishFiles");
  }
  publishFile(fileName) {
    return http.get("/publishFile?fileName="+fileName);
  }
  deleteFile(fileName) {
    return http.get("/deleteFile?fileName="+fileName);
  }

}

export default new UploadFilesService();
