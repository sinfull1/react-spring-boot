import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import saga from "./sagas/sagas";
import logger from "redux-logger";
import createReducer from "./rootReducer";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, logger];
let store = configureStore({
  reducer: createReducer({}),
  middleware: [...getDefaultMiddleware({ thunk: false }), ...middlewares],
});
sagaMiddleware.run(saga);

store.asyncReducers = {};

// Create an inject reducer function
// This function adds the async reducer, and creates a new combined reducer
store.injectReducer = (key, asyncReducer) => {
  store.asyncReducers[key] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
};

// Return the modified store

export default store;
