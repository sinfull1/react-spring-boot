import Axios from "axios";
class LoginApi{

    callAPI =  ({url, method, data}) => {
        return Axios({
            url,
            method,
            data,
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
            }
            return true;
          }
        });
    };
}


export default new LoginApi();