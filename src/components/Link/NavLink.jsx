import React from 'react'
import PropTypes from 'prop-types'
import { NavLink as ReactNavLink } from 'react-router-dom'
import styled from 'styled-components'
import { styles } from './styles'

const StyledNavLink = styled(ReactNavLink)`
  ${props => styles(props)}
`

const NavLink = ({ to, title = '' }) => {
  return (
    <StyledNavLink exact to={to}>
      {title.toUpperCase()}
    </StyledNavLink>
  )
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string,
}

export { NavLink }
