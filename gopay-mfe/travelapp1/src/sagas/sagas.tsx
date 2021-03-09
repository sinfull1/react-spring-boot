import { call, put, takeEvery, all } from "redux-saga/effects";
import LoginApi from "../api/request.interface";
import { AUTH_API_URL, API_URL } from "../settings";
import {
  setOriginValue,
  setDestinationValue,
  setDateValues,
  setTravelDetail,
  setFlightOriginValues,
  setDestinationFlightValues,
} from "./travel.sagas";

export function* publish(payload) {
  const { id } = payload.payload;
  try {
    let result = yield call(() =>
      LoginApi.callAPI({
        url:
          API_URL +
          "/publish?message=" +
          id +
          "&user=" +
          localStorage.getItem("name"),
        method: "GET",
        data: {},
      })
    );
    if ("Success" === result.data && result.status == 200) {
      console.log("published sucesfully");
    }
  } catch (e) {
    yield put({ type: "TODO_FETCH_FAILED" });
  }
}

export default function* rootSaga() {
  yield all([
    setOriginValue(),
    setDestinationValue(),
    setDateValues(),
    setTravelDetail(),
    setFlightOriginValues(),
    setDestinationFlightValues(),
  ]);
}
