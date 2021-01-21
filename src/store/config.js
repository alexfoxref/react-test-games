import { getCurrentScreenType, getCurrentScreenWidth } from '../../utils'

const initialScreenWidth = getCurrentScreenWidth()
const initialScreenType = getCurrentScreenType(initialScreenWidth)

export const initialState = {
  screen: { width: initialScreenWidth, type: initialScreenType },
}

export const types = {
  SET_SCREEN: 'SET_SCREEN',
}
