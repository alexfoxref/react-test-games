import { initialState, types } from '../config'

export const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_GAMES_LOADING:
      return { ...state, loading: { ...state.loading, games: action.payload } }
    case types.SET_GAME_LOADING:
      return { ...state, loading: { ...state.loading, game: action.payload } }
    case types.SET_PLATFORMS_LOADING:
      return {
        ...state,
        loading: { ...state.loading, platforms: action.payload },
      }
    case types.SET_SCREENSHOTS_LOADING:
      return {
        ...state,
        loading: { ...state.loading, screenshots: action.payload },
      }
    case types.SET_REQUEST_ERROR:
      return { ...state, error: action.payload }
    default:
      return state
  }
}
