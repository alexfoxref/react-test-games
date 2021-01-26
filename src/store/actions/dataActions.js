import { types } from '../config'

export const dataActions = {
  setGames: payload => ({
    type: types.SET_GAMES,
    payload,
  }),

  addGames: payload => ({
    type: types.ADD_GAMES,
    payload,
  }),

  setLastGamesPage: payload => ({
    type: types.SET_LAST_GAMES_PAGE,
    payload,
  }),

  addPlatforms: payload => ({
    type: types.ADD_PLATFORMS,
    payload,
  }),

  setLastPlatformsPage: payload => ({
    type: types.SET_LAST_PLATFORMS_PAGE,
    payload,
  }),

  setGamesPage: payload => ({
    type: types.SET_GAMES_PAGE,
    payload,
  }),

  setPlatformsPage: payload => ({
    type: types.SET_PLATFORMS_PAGE,
    payload,
  }),

  addGameAdditions: payload => ({
    type: types.ADD_GAME_ADDITIONS,
    payload,
  }),

  addGameScreenshots: payload => ({
    type: types.ADD_GAME_SCREENSHOTS,
    payload,
  }),

  setLastScreenshotsPage: payload => ({
    type: types.SET_LAST_SCREENSHOTS_PAGE,
    payload,
  }),

  setScreenshotsPage: payload => ({
    type: types.SET_SCREENSHOTS_PAGE,
    payload,
  }),
}
