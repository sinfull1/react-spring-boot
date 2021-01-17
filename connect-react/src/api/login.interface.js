import Axios from "axios";
class LoginApi{

    callAPI = async ({url, method, data}) => {
        return Axios({
            url,
            method,
            data
        });
    };
}

export default new LoginApi();