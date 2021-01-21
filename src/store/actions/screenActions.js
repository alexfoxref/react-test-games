import { getCurrentScreenType, getCurrentScreenWidth } from '../../../utils'
import { types } from '../config'

export const screenActions = {
  setScreen: () => (dispatch, getState) => {
    const lastScreenWidth = getState().screen.width
    const currentScreenWidth = getCurrentScreenWidth()

    if (lastScreenWidth !== currentScreenWidth) {
      const currentScreenType = getCurrentScreenType(currentScreenWidth)

      dispatch({
        type: types.SET_SCREEN,
        payload: {
          width: currentScreenWidth,
          type: currentScreenType,
        },
      })
    }
  },
}
