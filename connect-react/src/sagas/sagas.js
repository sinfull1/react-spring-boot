import {call, takeEvery, put} from "redux-saga/effects";
import {setToken,reload,setMessage} from "../slices/auth.slice";
import {setTotal,setOrigin,setDestination,setDates,setTravel,setOriginFlight,setDestinationFlight,setTravelDetails, setTravellerDetails} from "../slices/travel.slice";
import LoginApi from '../api/login.interface';
import {AUTH_API_URL,API_URL} from '../settings';


export function* secureLogin(payload) {
    try {
        const {username, password} = payload.payload
        let result = yield call(() =>
            LoginApi.callAPI({
                url: AUTH_API_URL+"/login",
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



export function* secureRegister(payload) {
    try {
        const {username,email, password} = payload.payload
        let result = yield call(() =>
            LoginApi.callAPI({
                url: AUTH_API_URL+"/register",
                method: "POST",
                data: {username: username, email:email, password: password}
            })
        );

        yield put(setToken({username:username,token:result.data.token}));
        yield put(reload());
    } catch (e) {
        yield put({type: "TODO_FETCH_FAILED"});
    }
}


export function* getTravel(payload) {
    try {
        const {origin,destination,travelDate} = payload.payload
        let result = yield call(() =>
            LoginApi.callAPI({
                url: API_URL+"/getTravel",
                method: "POST",
                data: {origin: origin, destination:destination, travelDate: travelDate},
                headers: {Authorization: "Bearer "+localStorage.getItem("token")}
            })
        );

        yield put(setTravel(result.data));
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
export function* setOriginFlightValues(payload)
{
   yield put(setOriginFlight(payload))
}
export function* setDestinationFlightValues(payload)
{
   yield put(setDestinationFlight(payload))
}

export function* setTravelDetail(payload)
{
   yield put(setTravelDetails(payload))
}


export function* setTotalDisplay(payload)
{
   yield put(setTotal(payload))
}

export function* setTravellerDisplayDetails(payload)
{
   yield put(setTravellerDetails(payload))
}

export default function* rootSaga() {
    yield takeEvery("SECURE_LOGIN", secureLogin);
    yield takeEvery("SECURE_REGISTER", secureRegister);
    yield takeEvery("SET_ORIGIN", setOriginValue);
    yield takeEvery("SET_DESTINATION", setDestinationValue);
    yield takeEvery("SET_DATES", setDateValues);
    yield takeEvery("SET_ORIGIN_FLIGHT", setOriginFlightValues);
    yield takeEvery("SET_DESTINATION_FLIGHT", setDestinationFlightValues);
    yield takeEvery("SET_TRAVEL", getTravel);
    yield takeEvery("SET_TRAVELLER", setTravelDetail);
    yield takeEvery("SET_TOTAL", setTotalDisplay);
    yield takeEvery("SET_TRAVELLER_DETAILS", setTravellerDisplayDetails);
}
