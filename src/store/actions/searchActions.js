import { types } from '../config'

export const searchActions = {
  setSearchParam(type, payload = '') {
    switch (type) {
      case types.SET_SEARCH:
        return {
          type: types.SET_SEARCH,
          payload,
        }
      case types.SET_SORT:
        return {
          type: types.SET_SORT,
          payload,
        }
      case types.SET_SORT_DIRECTION:
        return {
          type: types.SET_SORT_DIRECTION,
          payload,
        }
      case types.SET_FILTER:
        return {
          type: types.SET_FILTER,
          payload,
        }
      case types.SET_PAGE:
        return {
          type: types.SET_PAGE,
          payload,
        }
      default:
        return
    }
  },

  setSearch(payload) {
    return this.setSearchParam(types.SET_SEARCH, payload)
  },
  setSort(payload) {
    return this.setSearchParam(types.SET_SORT, payload)
  },
  setSortDirection(payload) {
    return this.setSearchParam(types.SET_SORT_DIRECTION, payload)
  },
  setFilter(payload) {
    return this.setSearchParam(types.SET_FILTER, payload)
  },
}
