import {call, takeEvery, put} from "redux-saga/effects";
import {setToken} from "../slices/auth.slice";
import LoginApi from '../api/login.interface';

export function* secureLogin(payload) {
    try {
        const {username, password} = payload.payload
        let result = yield call(() =>
            LoginApi.callAPI({
                url: "https://localhost:8444/login",
                method: "POST",
                data: {username: username, password: password}
            })
        );
        yield put(setToken({username:username,token:result.data.token}));
    } catch (e) {
        yield put({type: "TODO_FETCH_FAILED"});
    }
}

export default function* rootSaga() {
    yield takeEvery("SECURE_LOGIN", secureLogin);
}
