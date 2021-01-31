import {call, takeEvery, put} from "redux-saga/effects";
import {setToken,reload} from "../slices/auth.slice";
import {setOrigin,setDestination,setDates,setFlight} from "../slices/travel.slice";
import LoginApi from '../api/login.interface';
import {AUTH_API_URL} from '../settings';


export function* secureLogin(payload) {
    try {
        const {username, password} = payload.payload
        let result = yield call(() =>
            LoginApi.callAPI({
                url: AUTH_API_URL+"login",
                method: "POST",
                data: {username: username, password: password}
            })
        );
        yield put(setToken({username:username,token:result.data.token}));
        yield put(reload());
    } catch (e) {
        yield put({type: "TODO_FETCH_FAILED"});
    }
}

export function* setOriginValue(payload)
{
   yield put(setOrigin(payload))
}

export function* setDestinationValue(payload)
{
   yield put(setDestination(payload))
}

export function* setDateValues(payload)
{
   yield put(setDates(payload))
}
export function* setFlightValues(payload)
{
   yield put(setFlight(payload))
}



export default function* rootSaga() {
    yield takeEvery("SECURE_LOGIN", secureLogin);
    yield takeEvery("SET_ORIGIN", setOriginValue);
    yield takeEvery("SET_DESTINATION", setDestinationValue);
    yield takeEvery("SET_DATES", setDateValues);
    yield takeEvery("SET_FLIGHT", setFlightValues);
}
