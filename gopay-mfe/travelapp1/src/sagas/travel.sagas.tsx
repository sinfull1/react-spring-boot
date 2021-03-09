import {
  call,
  takeEvery,
  put,
  cancelled,
  fork,
  take,
  cancel,
} from "redux-saga/effects";
import {
  setTotal,
  setOrigin,
  setDestination,
  setDates,
  setTravel,
  setFlightOrigin,
  setDestinationFlight,
  setTravelDetails,
  setTravellerDetails,
} from "../slices/travel.slice";
import LoginApi from "../api/request.interface";
import { API_URL } from "../settings";
import { TravelAction, TravelInterface } from "../slices/travel.slice";

export function* getTravel(travelAction: TravelAction) {
  try {
    const { origin, destination, travelDate } = travelAction.payload;
    let result = yield call(() =>
      LoginApi.callAPI({
        url: API_URL + "/getTravel",
        method: "POST",
        data: {
          origin: origin,
          destination: destination,
          travelDate: new Date(travelDate),
        },
      })
    );
    if (result.status == 200) {
      travelAction.payload.travels = result.data;
      yield put(setTravel(travelAction.payload));
    }
  } catch (e) {
    yield put({ type: "TODO_FETCH_FAILED" });
  }
}

export function* setOriginValue() {
  while (true) {
    const travelAction: TravelAction = yield take("SET_ORIGIN");
    yield put(setOrigin(travelAction.payload));
  }
}

export function* setDestinationValue() {
  while (true) {
    const travelAction: TravelAction = yield take("SET_DESTINATION");
    yield put(setDestination(travelAction.payload));
  }
}

export function* setDateValues() {
  while (true) {
    const travelAction: TravelAction = yield take("SET_DATES");
    yield put(setDates(travelAction.payload));
  }
}
export function* setFlightOriginValues() {
  while (true) {
    const travelAction: TravelAction = yield take("SET_FLIGHT_ORIGIN");
    yield put(setFlightOrigin(travelAction.payload));
  }
}
export function* setDestinationFlightValues() {
  while (true) {
    const travelAction: TravelAction = yield take("SET_DESTINATION_FLIGHT");
    yield put(setDestinationFlight(travelAction.payload));
  }
}

export function* setTravelDetail() {
  while (true) {
    const travelAction: TravelAction = yield take("SET_TRAVEL");
    yield fork(getTravel, travelAction);
  }
}

export function* setTotalDisplay() {
  while (true) {
    const travelAction: TravelAction = yield take("SET_TOTAL");
    yield put(setTotal(travelAction.payload));
  }
}

export function* setTravellerDisplayDetails() {
  while (true) {
    const travelAction: TravelAction = yield take("SET_TRAVELLER_DETAILS");
    yield put(setTravelDetails(travelAction.payload));
  }
}
