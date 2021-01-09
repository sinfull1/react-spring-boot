import authHeader from "./auth-header";
import {API_URL} from '../App';


class EventService {

  getEventGridDataSourceBySubs(id) {
    return new EventSource(API_URL+ "/getHttp?subsId=" + id);
  }
  getEventDataById(id, type) {
    return fetch(API_URL+ "/event?subsId=" + id + "&event=sample");
  }
  getPricesDataSource() {
    return new EventSource(API_URL+"/getPrices");
  }


}

export default new EventService();
