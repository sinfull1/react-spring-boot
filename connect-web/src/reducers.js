//import auth from './reducers/auth';

import common from './reducers/common';
import auth from './reducers/auth';
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  common,
  auth
})
export default createRootReducer



