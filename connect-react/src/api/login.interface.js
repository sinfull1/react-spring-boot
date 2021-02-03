import Axios from "axios";
class LoginApi{

    callAPI = async ({url, method, data}) => {
        return Axios({
            url,
            method,
            data,
            headers: {
                post: {        // can be common or any other method
                  Authorization: "Bearer "+ localStorage.getItem("user")
                }
              },
              mode: 'no-cors',


        });
    };
}

export default new LoginApi();