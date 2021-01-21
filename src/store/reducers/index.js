import { combineReducers } from 'redux'
import { screenReducer } from './screenReducer'
import { routerReducer } from 'react-router-redux'

export const rootReducer = combineReducers({
  routing: routerReducer,
  screen: screenReducer,
})
