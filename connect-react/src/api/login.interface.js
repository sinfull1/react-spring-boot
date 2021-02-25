import Axios from "axios";
import {history} from '../helpers/history';
class LoginApi{

    callAPI =  ({url, method, data}) => {
        return Axios({
            url,
            method,
            data,
            timeout: 1000 * 3,
            headers: {
                post: {        // can be common or any other method
                  Authorization: "Bearer "+ localStorage.getItem("user")
                },
                get: {        // can be common or any other method
                  Authorization: "Bearer "+ localStorage.getItem("user")
                }
              },
         
           validateStatus: function (status) {
            if(status==401)
            {
              localStorage.removeItem("name");
              localStorage.removeItem("user");
              history.push("/home");
              window.location.reload();
            }
            return true;
          }
        });
    };


    callLoginAPI =  ({url, method, data}) => {
      return Axios({
          url,
          method,
          data,
          timeout: 1000 * 3,
      });
  };
}


export default new LoginApi();