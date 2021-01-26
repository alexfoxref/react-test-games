import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledDiv = styled.div`
  width: 100%;
  padding: 2rem;
  background-color: ${({ theme }) => theme.backgroundColor.active || '#ffffff'};
  color: ${({ theme }) => theme.textColor.active || '#000000'};
  border: 1px solid ${({ error }) => (error ? 'red' : 'blue')};
  border-left: 10px solid ${({ error }) => (error ? 'red' : 'blue')};
`

const Message = props => {
  return <StyledDiv {...props} />
}

Message.propTypes = {
  error: PropTypes.bool,
}

export { Message }
