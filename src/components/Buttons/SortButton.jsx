import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from './Button'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  padding: 0;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background-color: ${({ theme }) =>
    theme.backgroundColor.third || 'rgba(255, 255, 255, .16)'};
  position: relative;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) =>
      theme.backgroundColor.secondary || 'rgba(255, 255, 255, .07)'};
  }

  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 10px;
    height: 10px;
    background-color: transparent;
    border: 2px solid
      ${({ theme }) => theme.textColor.primary || 'rgba(255, 255, 255, 1)'};
    transform: translate(-50%, -50%) rotate(45deg);
    transition: all ease ${({ theme }) => theme.animationTime / 1000 || '.2'}s;

    ${({ direction }) =>
      direction === 'desc'
        ? `
						border-top: none;
						border-left: none;
					`
        : `
						border-bottom: none;
						border-right: none;
					`}
  }
`

const SortButton = props => {
  const [direction, setDirection] = useState(props.direction || 'asc')
  const isASC = direction === 'asc'

  const changeDirectionHandler = () => {
    if (props.value !== '') {
      const nextDirection = isASC ? 'desc' : 'asc'

      setDirection(nextDirection)
      props.chooseDirection(nextDirection)
    }
  }

  return (
    <StyledButton
      {...props}
      onClick={changeDirectionHandler}
      direction={direction}
    />
  )
}

SortButton.propTypes = {
  direction: PropTypes.oneOf(['asc', 'desc']).isRequired,
  chooseDirection: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export { SortButton }
