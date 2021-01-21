import { initialState, types } from '../config'

export const screenReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SCREEN:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
