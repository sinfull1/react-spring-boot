import { combineReducers } from "@reduxjs/toolkit";

import travelReducer from "./slices/travel.slice";

function createReducer(intialReducer = {}) {
  const rootReducer = combineReducers({
    ...intialReducer,
    travel: travelReducer,
  });
  return rootReducer;
}

export default createReducer;
