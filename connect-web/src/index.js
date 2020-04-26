import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';

import { Route, Switch } from 'react-router-dom';

import App from './component/App';
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducers'

export const history = createBrowserHistory()

  const store = createStore(
    createRootReducer(history),
    {"router":""},
      applyMiddleware(
        routerMiddleware(history),
    ),
  )
ReactDOM.render((
  <Provider store={store}>

            <App history={history} />
  </Provider>

), document.getElementById('root'));
