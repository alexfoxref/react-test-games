import { replace } from 'react-router-redux'

export const routingActions = {
  initLocation: () => {
    return replace(window.location.pathname)
  },
}
