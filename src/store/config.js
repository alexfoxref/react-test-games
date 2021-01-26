import { config } from '../../config'
import { getCurrentScreenType, getCurrentScreenWidth } from '../../utils'

const initialScreenWidth = getCurrentScreenWidth()
const initialScreenType = getCurrentScreenType(initialScreenWidth)

export const initialState = {
  screen: { width: initialScreenWidth, type: initialScreenType },
  search: {
    search: config.search.search,
    sort: config.search.sort
      ? config.search.sort.find(({ selected }) => selected)?.value
      : '',
    sort_direction: config.search.sort_direction,
    filter: config.search.filter
      ? config.search.filter.find(({ selected }) => selected)?.value
      : '',
  },
  data: {
    gamesPage: config.api.startPage,
    games: [],
    isLastGamesPage: false,
    platformsPage: config.api.startPage,
    platforms: config.search.filter,
    isLastPlatformsPage: false,
    screenshotsPage: config.api.startPage,
    isLastScreenshotsPage: false,
  },
  request: {
    loading: {
      games: false,
      game: false,
      platforms: false,
      screenshots: false,
    },
    error: null,
  },
}

export const types = {
  SET_SCREEN: 'SET_SCREEN',
  SET_SEARCH: 'SET_SEARCH',
  SET_SORT: 'SET_SORT',
  SET_SORT_DIRECTION: 'SET_SORT_DIRECTION',
  SET_FILTER: 'SET_FILTER',
  SET_GAMES: 'SET_GAMES',
  ADD_GAMES: 'ADD_GAMES',
  ADD_PLATFORMS: 'ADD_PLATFORMS',
  SET_LAST_GAMES_PAGE: 'SET_LAST_GAMES_PAGE',
  SET_LAST_PLATFORMS_PAGE: 'SET_LAST_PLATFORMS_PAGE',
  SET_GAMES_PAGE: 'SET_GAMES_PAGE',
  SET_PLATFORMS_PAGE: 'SET_PLATFORMS_PAGE',
  SET_GAMES_LOADING: 'SET_GAMES_LOADING',
  SET_GAME_LOADING: 'SET_GAME_LOADING',
  SET_PLATFORMS_LOADING: 'SET_PLATFORMS_LOADING',
  SET_REQUEST_ERROR: 'SET_REQUEST_ERROR',
  ADD_GAME_ADDITIONS: 'ADD_GAME_ADDITIONS',
  SET_SCREENSHOTS_LOADING: 'SET_SCREENSHOTS_LOADING',
  ADD_GAME_SCREENSHOTS: 'ADD_GAME_SCREENSHOTS',
  SET_LAST_SCREENSHOTS_PAGE: 'SET_LAST_SCREENSHOTS_PAGE',
  SET_SCREENSHOTS_PAGE: 'SET_SCREENSHOTS_PAGE',
}
