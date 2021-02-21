import { call,  put, cancelled, fork, take, cancel } from "redux-saga/effects";
import { setToken } from "../slices/auth.slice";
import LoginApi from '../api/login.interface';
import { AUTH_API_URL } from '../settings';
import { history } from '../helpers/history';

function* authorize(username, password) {
    try {
        let axoj = LoginApi.callAPI({
            url: AUTH_API_URL + "/login",
            method: "POST",
            data: { username: username, password: password }
        });
      let result = yield call(() => axoj);
      if(result.status ==200)
      {
        yield put(setToken({ username: username, token: result.data.token }));
        history.push("/home");
      }
    } catch(error) {
      yield put({type: 'LOGIN_ERROR', error})
    } finally {
       if (yield cancelled()) {
     }
    }
  }



  

export default function* loginFlow() {
    while(true)
    {
      if(!localStorage.getItem("name"))
      {
        const loginaction =  yield take("SECURE_LOGIN");
        const {username, password} = loginaction.payload;
        const task = yield fork(authorize, username, password)
      }
      const action = yield take(['LOGOUT', 'LOGIN_ERROR'])
      if (action.type === 'LOGOUT')
       // yield cancel(task)
        yield put(setToken({ username: "", token: "" }));
        history.push("/home");
    }
    
}
