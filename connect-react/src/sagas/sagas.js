import { call,  put, takeEvery,all } from "redux-saga/effects";
import { setToken, reload, setMessage } from "../slices/auth.slice";
import LoginApi from '../api/login.interface';
import { AUTH_API_URL, API_URL } from '../settings';
import loginFlow from "./authsaga";
import travelSagas from "./travel.sagas";

let gg = []


export function* secureRegister(payload) {
    try {
        const { username, email, password } = payload.payload
        let result = yield call(() =>
            LoginApi.callAPI({
                url: AUTH_API_URL + "/register",
                method: "POST",
                data: { username: username, email: email, password: password }
            })
        );
        if(result.status==200)
        {
        yield put(setToken({ username: username, token: result.data.token }));
        yield put(reload());
        }
    } catch (e) {
        yield put({ type: "TODO_FETCH_FAILED" });
    }
}

export function* publish(payload) {
    const { id } = payload.payload
    try {

        let result = yield call(() =>
            LoginApi.callAPI({
                url: API_URL + "/publish?message=" + id + "&user=" + localStorage.getItem("name"),
                method: "GET",
                data: {}
            })
        );
        if ("Success" === result.data && result.status == 200) {
            console.log("published sucesfully");
        }
        ;
    } catch (e) {
        yield put({ type: "TODO_FETCH_FAILED" });
    }
}


export default function* rootSaga() {
    yield all([
        loginFlow(),
        travelSagas(),
        yield takeEvery("PUBLISH", publish)
      ])

    ;
}
