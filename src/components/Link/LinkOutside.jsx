import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Link = styled.a`
  color: ${({ color, theme }) => color || theme.textColor.active || '#000000'};
  text-decoration: none;
  cursor: pointer;
  display: block;
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.textColor.hover || 'rgba(0, 0, 0, .6)'};
  }

  &:visited {
    color: ${({ color, theme }) =>
      color || theme.textColor.active || '#000000'};
  }
`

const LinkOutside = ({ to = '#', color, children }) => {
  return (
    <Link href={to} color={color}>
      {children}
    </Link>
  )
}

LinkOutside.propTypes = {
  to: PropTypes.string,
  color: PropTypes.string,
}

export { LinkOutside }
