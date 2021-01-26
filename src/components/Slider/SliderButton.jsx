import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from '../Buttons/Button'

const StyledSliderButton = styled(Button)`
  padding: 0;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background-color: ${({ theme, disabled }) =>
    !disabled ? theme.backgroundColor.primary || '#151515' : '#cccccc'};
  position: relative;
  cursor: pointer;
  opacity: 0.8;
  z-index: 6;

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
      direction === 'back'
        ? `
					border-top: none;
					border-right: none;
				`
        : `
					border-bottom: none;
					border-left: none;
				`}
  }

  &:hover {
    opacity: 1;
  }
`

const SliderButton = ({ direction, navigationClick, disabled }) => {
  return (
    <StyledSliderButton
      direction={direction}
      onClick={() => navigationClick(direction)}
      disabled={disabled}
    />
  )
}

SliderButton.propTypes = {
  direction: PropTypes.oneOf(['back', 'forward']),
  navigationClick: PropTypes.func,
  disabled: PropTypes.bool,
}

export { SliderButton }
