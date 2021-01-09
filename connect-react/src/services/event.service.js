
import axios from "axios";
import {API_URL} from  '../settings';
const http = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("user")
  }
});

class EventService {

  getEventGridDataSourceBySubs(id) {
    return new EventSource(API_URL+ "/getHttp?subsId=" + id);
  }
  getEventDataById(id, type) {
    return http.get(API_URL+ "/event?subsId=" + id + "&event=sample");
  }
  getPricesDataSource() {
    return new EventSource(API_URL+"/getPrices");
  }


}

export default new EventService();
