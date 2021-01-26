import React from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'
import { styles } from './styles'

const StyledLink = styled(RouterLink)`
  ${props => styles(props)}
`

const Link = ({ to, title = '' }) => {
  return <StyledLink to={to}>{title.toUpperCase()}</StyledLink>
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string,
}

export { Link }
