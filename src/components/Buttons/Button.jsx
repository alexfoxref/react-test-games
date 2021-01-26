import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  padding: 0.5rem 2rem;
  background-color: transparent;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  transition: all ease 0.2s;

  &.${props => props.theme.activeClassName} {
    box-shadow: 0 0 4px 2px ${props => props.theme.textColor.primary};
  }

  &:focus {
    outline: none;
  }
`

export const Button = props => {
  return <StyledButton {...props} />
}
