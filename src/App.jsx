import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { screenActions } from './store/actions/screenActions'
import { routingActions } from './store/actions/routingActions'
import { Route, Switch } from 'react-router-dom'
import { config } from '../config'
import { Navbar } from './components/Navbar/Navbar'
import styled from 'styled-components'
import { requestActions } from './store/actions/requestActions'
import { Message } from './components/Message/Message'

const AppWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 0;
  background-color: ${props => props.theme.backgroundColor.primary};
  color: ${props => props.theme.textColor.primary};
  font-size: ${({ screenType, theme }) => theme.fontSizes[screenType] || 16}px;
`

const MessageWrapper = styled.div`
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: transparent;
`

export const App = () => {
  const location = useSelector(state => state.routing.locationBeforeTransitions)
  const dispatch = useDispatch()
  const setScreen = () => dispatch(screenActions.setScreen())
  const screentType = useSelector(state => state.screen.type)
  const { error: requestError } = useSelector(state => state.request)
  const [errors, setErrors] = useState([])
  const errorsCounter = useRef(0)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [location])

  useEffect(() => {
    dispatch(routingActions.initLocation())
    window.addEventListener('resize', setScreen)

    return () => {
      window.removeEventListener('resize', setScreen)
    }
  }, [])

  useEffect(() => {
    if (requestError) {
      const currentId = errorsCounter.current++
      setErrors(prev => [...prev, { id: currentId, message: requestError }])
      dispatch(requestActions.setRequestError(null))
      setTimeout(() => {
        setErrors(prev => prev.filter(({ id }) => id !== currentId))
      }, 3000)
    }
  }, [dispatch, requestError, errorsCounter.current])

  const closeHandler = id => {
    setErrors(prev => prev.filter(({ id: i }) => id !== i))
  }

  return (
    <AppWrapper screentType={screentType}>
      {errors.length > 0 && (
        <MessageWrapper>
          {errors.map(({ id, message }) => (
            <Message error key={`error-${id}`} onClick={() => closeHandler(id)}>
              {message}
            </Message>
          ))}
        </MessageWrapper>
      )}
      <Navbar />
      <Switch>
        {config.routes.map(props => (
          <Route {...props} />
        ))}
      </Switch>
    </AppWrapper>
  )
}
