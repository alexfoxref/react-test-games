import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { initialState } from './config'
import { rootReducer } from './reducers'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'

export const browserHistory = createBrowserHistory()
const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose

export const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk, routerMiddleware(browserHistory)))
)
