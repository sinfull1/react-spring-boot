import { combineReducers } from '@reduxjs/toolkit'

import authReducer from './slices/auth.slice'
import travelReducer from './slices/travel.slice'


const rootReducer = combineReducers({
    auth: authReducer,
    travel: travelReducer
})



export default rootReducer
