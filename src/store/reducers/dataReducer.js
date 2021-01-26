import { initialState, types } from '../config'

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_GAMES:
      return {
        ...state,
        games: action.payload,
      }
    case types.ADD_GAMES:
      return {
        ...state,
        games: [...state.games, ...action.payload],
      }
    case types.ADD_PLATFORMS:
      return {
        ...state,
        platforms: [...state.platforms, ...action.payload],
      }
    case types.SET_LAST_GAMES_PAGE:
      return {
        ...state,
        isLastGamesPage: action.payload,
      }
    case types.SET_LAST_PLATFORMS_PAGE:
      return {
        ...state,
        isLastPlatformsPage: action.payload,
      }
    case types.SET_GAMES_PAGE:
      return {
        ...state,
        gamesPage: action.payload,
      }
    case types.SET_PLATFORMS_PAGE:
      return {
        ...state,
        platformsPage: action.payload,
      }
    case types.ADD_GAME_ADDITIONS:
      return {
        ...state,
        games:
          state.games.length > 0
            ? state.games.map(game => {
                if (game.id === action.payload.id) {
                  return { withAdditions: true, ...game, ...action.payload }
                }

                return game
              })
            : [{ withAdditions: true, ...action.payload }],
      }
    case types.ADD_GAME_SCREENSHOTS:
      return {
        ...state,
        games: state.games.map(game => {
          if (game.slug === action.payload.slug) {
            return {
              withScreenshots: true,
              ...game,
              screenshots: game.screenshots
                ? [...game.screenshots, ...action.payload.data]
                : action.payload.data,
            }
          }

          return game
        }),
      }
    case types.SET_LAST_SCREENSHOTS_PAGE:
      return {
        ...state,
        isLastScreenshotsPage: action.payload,
      }
    case types.SET_SCREENSHOTS_PAGE:
      return {
        ...state,
        screenshotsPage: action.payload,
      }
    default:
      return state
  }
}
