import React from 'react'
import styled from 'styled-components'
import { Button } from './Button'

const StyledButton = styled(Button)`
  position: relative;
  width: 46px;
  height: 46px;
  padding: 0;
  transition: all ease ${props => props.theme.animationTime / 1000}s;

  &.${props => props.theme.activeClassName} {
    .upper {
      top: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
    }

    .center {
      display: none;
    }

    .lower {
      top: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
`

const Line = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 3px;
  background-color: ${props => props.theme.textColor.primary};
  transition: all ease 0.2s;

  &.upper {
    top: 30%;
  }

  &.center {
    top: 50%;
  }

  &.lower {
    top: 70%;
  }
`

export const BurgerButton = props => {
  return (
    <StyledButton {...props}>
      <Line className='upper' />
      <Line className='center' />
      <Line className='lower' />
    </StyledButton>
  )
}
