import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { config } from '../../../config'

const StyledInput = styled.input`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '46px'};
  border-radius: ${({ height }) => height / 2 || '23px'};
  background-color: ${({ theme, screenType }) => {
    const isTiny = screenType === config.tinyScreenType
    const isMobile = screenType === config.mobileScreenType
    const isTablet = screenType === config.tabletScreenType

    return isTiny || isMobile || isTablet
      ? theme.backgroundColor.active || '#ffffff'
      : theme.backgroundColor.secondary || 'rgba(255, 255, 255, .16)'
  }};
  border: none;
  font-size: ${({ theme, screenType = 'default' }) =>
    theme.fontSizes[screenType] * 1.2 || 12}px;
  color: ${({ theme, screenType }) => {
    const isTiny = screenType === config.tinyScreenType
    const isMobile = screenType === config.mobileScreenType
    const isTablet = screenType === config.tabletScreenType

    return isTiny || isMobile || isTablet
      ? theme.textColor.active || '#000000'
      : theme.textColor.secondary || 'rgba(255, 255, 255, 1)'
  }};
  padding: ${({ padding }) => padding || '0 30px'};
  transition: all ease ${({ theme }) => theme.animationTime / 1000 || '.2'}s;

  &:focus {
    outline: none;
  }

  &:hover,
  &:focus {
    background-color: ${({ theme }) =>
      theme.backgroundColor.active || 'rgba(255, 255, 255, 1)'};
    color: ${({ theme }) => theme.textColor.active || '#000000'};
  }
`

const Input = props => {
  return <StyledInput {...props} />
}

Input.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  padding: PropTypes.string,
  screenType: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}

export { Input }
