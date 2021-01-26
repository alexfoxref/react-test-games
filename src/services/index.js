import { config } from '../../config'
import { createURL } from '../../utils'

export const getRequest = async (urlParams = { pathname: null, query: {} }) => {
  const query = {
    key: config.api.API_KEY,
    ...Object.entries(urlParams.query || {}).reduce(
      (acc, [key, value]) => (value ? { ...acc, [key]: value } : acc),
      {}
    ),
  }

  if (query.search) {
    query.search_exact = true
  }

  const url = createURL({
    BASE: config.api.API_BASE,
    pathname: urlParams.pathname,
    query: {
      key: config.api.API_KEY,
      ...Object.entries(urlParams.query || {}).reduce(
        (acc, [key, value]) => (value ? { ...acc, [key]: value } : acc),
        {}
      ),
    },
  })

  const response = await fetch(url)

  if (!response.ok) {
    const json = await response.json()

    throw new Error(json.detail || `Bad fetch request to '${url}'`)
  }

  return await response.json()
}
