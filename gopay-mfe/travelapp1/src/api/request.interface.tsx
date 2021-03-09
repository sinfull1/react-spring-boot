import Axios, { AxiosPromise } from "axios";
import { history } from "../helpers/history";
import axios, { AxiosRequestConfig, Canceler } from "axios";

const authheaders = {
  post: {
    Authorization: "Bearer " + localStorage.getItem("user"),
  },
  get: {
    Authorization: "Bearer " + localStorage.getItem("user"),
  },
};
class LoginApi {
  public callAPI = (loginRequest: any): AxiosPromise<any> => {
    const config: AxiosRequestConfig = {
      url: loginRequest.url,
      headers: authheaders,
      data: loginRequest.data,
      method: loginRequest.method,
      timeout: 3000,
      responseType: "json",
      validateStatus: (status: number) => {
        if (status == 401) {
          localStorage.removeItem("name");
          localStorage.removeItem("user");
          history.push("/home");
          window.location.reload();
        }
        return true;
      },
      cancelToken: new axios.CancelToken((cancel: Canceler) => {}),
    };
    return Axios(config);
  };

  public callLoginAPI = (loginRequest: LoginRequest): AxiosPromise<any> => {
    const config: AxiosRequestConfig = {
      url: loginRequest.url,
      headers: authheaders,
      data: loginRequest.data,
      method: loginRequest.method,
      timeout: 3000,
    };
    return Axios(config);
  };
}

export default new LoginApi();
