import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { screenActions } from './store/actions/screenActions'
import { routingActions } from './store/actions/routingActions'

export const App = () => {
  const dispatch = useDispatch()
  const setScreen = () => dispatch(screenActions.setScreen())

  useEffect(() => {
    dispatch(routingActions.initLocation())
    window.addEventListener('resize', setScreen)

    return () => {
      window.removeEventListener('resize', setScreen)
    }
  }, [])

  return (
    <>
      <h1>App</h1>
    </>
  )
}
