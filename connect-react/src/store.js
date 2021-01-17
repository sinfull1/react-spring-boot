
import { configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import saga from "./sagas/sagas";
import logger from 'redux-logger';
import rootReducer from './rootReducer'
const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware, logger];
const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware({thunk: false}), ...middlewares],
});
sagaMiddleware.run(saga);
if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./rootReducer', () => {
        const newRootReducer = require('./rootReducer').default
        store.replaceReducer(newRootReducer)
    })
}

export default store
