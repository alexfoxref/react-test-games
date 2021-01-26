import {
  getGameAdditionsList,
  getGameScreenshotsList,
  getGamesList,
  getPlatformsList,
} from '../../services/gamesServise'
import { types } from '../config'
import { dataActions } from './dataActions'

export const requestActions = {
  setGamesLoading: payload => ({
    type: types.SET_GAMES_LOADING,
    payload,
  }),

  setPlatformsLoading: payload => ({
    type: types.SET_PLATFORMS_LOADING,
    payload,
  }),

  setGameLoading: payload => ({
    type: types.SET_GAME_LOADING,
    payload,
  }),

  setRequestError: payload => ({
    type: types.SET_REQUEST_ERROR,
    payload,
  }),

  setScreenshotLoading: payload => ({
    type: types.SET_SCREENSHOTS_LOADING,
    payload,
  }),

  setGamesList: page => async dispatch => {
    try {
      dispatch(requestActions.setGamesLoading(true))
      const { data, isLastPage } = await getGamesList(page)

      dispatch(dataActions.setGames(data))
      dispatch(dataActions.setLastGamesPage(isLastPage))
    } catch (e) {
      dispatch(requestActions.setRequestError(e.message))
    } finally {
      dispatch(requestActions.setGamesLoading(false))
    }
  },

  addGamesList: page => async dispatch => {
    try {
      dispatch(requestActions.setGamesLoading(true))
      const { data, isLastPage } = await getGamesList(page)

      dispatch(dataActions.addGames(data))
      dispatch(dataActions.setLastGamesPage(isLastPage))
    } catch (e) {
      dispatch(requestActions.setRequestError(e.message))
    } finally {
      dispatch(requestActions.setGamesLoading(false))
    }
  },

  addPlatformsList: page => async dispatch => {
    try {
      dispatch(requestActions.setPlatformsLoading(true))
      const { data, isLastPage } = await getPlatformsList(page)

      dispatch(dataActions.addPlatforms(data))
      dispatch(dataActions.setLastPlatformsPage(isLastPage))
    } catch (e) {
      dispatch(requestActions.setRequestError(e.message))
    } finally {
      dispatch(requestActions.setPlatformsLoading(false))
    }
  },

  addGameAdditions: slug => async dispatch => {
    try {
      dispatch(requestActions.setGameLoading(true))
      const { data } = await getGameAdditionsList(slug)

      dispatch(dataActions.addGameAdditions(data))
    } catch (e) {
      dispatch(requestActions.setRequestError(e.message))
    } finally {
      dispatch(requestActions.setGameLoading(false))
    }
  },

  addGameScreenshots: (slug, page) => async dispatch => {
    try {
      dispatch(requestActions.setScreenshotLoading(true))
      const { data, isLastPage } = await getGameScreenshotsList(slug, page)

      dispatch(dataActions.addGameScreenshots({ data, slug }))
      dispatch(dataActions.setLastScreenshotsPage(isLastPage))
    } catch (e) {
      dispatch(requestActions.setRequestError(e.message))
    } finally {
      dispatch(requestActions.setScreenshotLoading(false))
    }
  },
}
