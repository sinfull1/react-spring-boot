//import auth from './reducers/auth';

import common from './reducers/common';
import auth from './reducers/auth';
import { combineReducers } from 'redux'


const createRootReducer = (history) => combineReducers({
  common,
  auth
})
export default createRootReducer



