import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import App from './component/App';
import {BrowserRouter as Router} from 'react-router-dom';
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import createRootReducer from './reducers'

export const history = createBrowserHistory()

const store = createStore(
    createRootReducer(history),
    {"router":""},
  )
ReactDOM.render((
  <Provider store={store}>
      <Router>
            <App history={history} />
      </Router>
  </Provider>

), document.getElementById('root'));
