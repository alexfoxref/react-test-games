import { config } from '../config'

export const getCurrentScreenWidth = () => document.documentElement.scrollWidth
export const getCurrentScreenType = currentScreenWidth =>
  config.screenTypes.find(
    ({ minWidth, maxWidth }) =>
      currentScreenWidth >= minWidth && currentScreenWidth <= maxWidth
  ).name
