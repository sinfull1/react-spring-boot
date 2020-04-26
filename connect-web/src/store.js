import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducers'

export const history = createBrowserHistory()

import {createStore} from 'redux';
import fileReducer from './reducers/fileReducer.jsx';

const initialState = {
    files: [
        {id: 1, file: 'notes.txt', folder: 'txt'},
        {id: 2, file: 'book.pdf', folder: 'pdf'},
        {id: 3, file: 'cv.pdf', folder: 'pdf'},
        // more files ...
    ]
};

export default createStore(fileReducer, initialState);