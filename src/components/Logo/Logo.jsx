import React from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'react-router-redux'
import styled from 'styled-components'

const H1 = styled.h1`
  cursor: pointer;
`

export const Logo = () => {
  const dispatch = useDispatch()
  const clickHandler = () => dispatch(push('/'))

  return <H1 onClick={clickHandler}>GAMES</H1>
}
