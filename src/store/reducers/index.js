import { combineReducers } from 'redux'
import { screenReducer } from './screenReducer'
import { routerReducer } from 'react-router-redux'
import { searchReducer } from './searchReducer'
import { dataReducer } from './dataReducer'
import { requestReducer } from './requestReducer'

export const rootReducer = combineReducers({
  routing: routerReducer,
  screen: screenReducer,
  search: searchReducer,
  data: dataReducer,
  request: requestReducer,
})
