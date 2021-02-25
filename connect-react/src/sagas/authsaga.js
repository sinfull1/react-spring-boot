import { call,  put, cancelled, fork, take, cancel } from "redux-saga/effects";
import { setMessage, setToken } from "../slices/auth.slice";
import LoginApi from '../api/login.interface';
import { AUTH_API_URL } from '../settings';
import { history } from '../helpers/history';

function* authorize(username, password) {
    try {
        let axoj = LoginApi.callLoginAPI({
            url: AUTH_API_URL + "/login",
            method: "POST",
            data: { username: username, password: password }
        });
      yield put(setMessage({ loading: true, message: "Logging in" }))
      let result = yield call(() => axoj);
      if(result.status ==200)
      {
        yield put(setToken({ username: username, token: result.data.token }));
        history.push("/home");
      }
      if(result.status==401)
        {
          yield put({type:"LOGIN_ERROR",message:"401"})
        }
    } catch(error) {
      yield put({type:"LOGIN_ERROR", message:error.message})
    } finally {
       if (yield cancelled()) {
     }
    }
  }

export default function* loginFlow() {
    while(true)
    {
      let task;
      if(!localStorage.getItem("name"))
      {
        const loginaction =  yield take("SECURE_LOGIN");
        const {username, password} = loginaction.payload;
        task = yield fork(authorize, username, password)
      }
      const action = yield take(['LOGOUT', 'LOGIN_ERROR'])
      if (action.type === 'LOGOUT')
      {
       // yield cancel(task)
        yield put(setToken({ username: "", token: "" }));
        history.push("/home");
      }
      if (action.type === 'LOGIN_ERROR')
      {
        localStorage.removeItem("name");
        localStorage.removeItem("user");
        yield put(setMessage({ loading: false, message: action.message }))
        yield cancel(task)
       
     //  history.push("/home");
      }
    }
    
}
