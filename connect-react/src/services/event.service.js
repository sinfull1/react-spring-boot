
import { LocalParking } from "@material-ui/icons";
import axios from "axios";
import { API_URL } from '../settings';
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

const user = localStorage.getItem("name");

class EventService {

  getEventGridDataSourceBySubs(id) {
    if (user) {
      let sseEvents = new EventSource(API_URL + "/getHttp?subsId=" + id);
      sseEvents.onopen = event => console.log('open', event);
      sseEvents.onerror = event => {
        console.log("Server side shut");
        sseEvents.close();
      }
      return sseEvents;
    }
  }

  getConsumeEvent() {
    if (user) {
      let sseEvents =  new EventSource(API_URL + "/consume?user=" + localStorage.getItem("name"));
      sseEvents.onopen = event => console.log('open', event);
      sseEvents.onerror = event => {
        console.log("Server side shut");
        sseEvents.close();
      }
      return sseEvents;
    }
  }
  getEventDataById(id, type) {
    if (user) {
      return http.get(API_URL + "/event?subsId=" + id + "&event=sample" );
    }
  }
  getPricesDataSource() {
    if (user) {
      let sseEvents =  new EventSource(API_URL + "/getPrices");
      sseEvents.onopen = event => console.log('open', event);
      sseEvents.onerror = event => {
        console.log("Server side shut");
        sseEvents.close();
      }
      return sseEvents;
    }
  }


}

export default new EventService();
