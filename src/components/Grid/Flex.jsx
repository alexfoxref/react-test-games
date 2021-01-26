import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledFlex = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  flex-basis: ${({ basis }) => basis || 'auto'};
  max-width: ${({ basis }) => basis || '100%'};
  flex-shrink: 0;
  flex-grow: 1;
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'flex-start'};
  padding: ${({ padding }) => padding || '0'};
  margin: ${({ margin }) => margin || '0'};
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
`

const Flex = props => {
  return <StyledFlex {...props} />
}

Flex.propTypes = {
  direction: PropTypes.string,
  basis: PropTypes.string,
  justify: PropTypes.string,
  align: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.string,
  wrap: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
}

export { Flex }
