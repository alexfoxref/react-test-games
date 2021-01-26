import { config } from '../config'

export const getCurrentScreenWidth = () => document.documentElement.scrollWidth

export const getCurrentScreenType = currentScreenWidth =>
  config.screenTypes.find(
    ({ minWidth, maxWidth }) =>
      currentScreenWidth >= minWidth && currentScreenWidth <= maxWidth
  ).name

export const createURL = (params = {}) => {
  if (!params.BASE || !params.pathname) {
    throw new Error('Некорректные параметры url')
  }

  return encodeURI(
    `${params.BASE}${params.pathname}?${Object.entries(params.query)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')}`
  )
}

// export const delay = async ms => new Promise(resolve => setTimeout(resolve, ms))
