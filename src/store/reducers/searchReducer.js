import { initialState, types } from '../config'

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      }
    case types.SET_SORT:
      return {
        ...state,
        sort: action.payload,
      }
    case types.SET_SORT_DIRECTION:
      return {
        ...state,
        sort_direction: action.payload,
      }
    case types.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      }
    default:
      return state
  }
}
