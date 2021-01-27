import React, { useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledSelectList = styled.ul`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: ${({ width }) => width || '100%'};
  max-height: 200px;
  overflow-x: hidden;
  overflow-y: scroll;
  border: 1px solid #cccccc;
  border-radius: ${({ height }) => height / 2 || '23px'};
  background-color: ${({ theme }) => theme.backgroundColor.active || '#ffffff'};
  padding: 5% 10%;
  list-style: none;
`

const SelectList = props => {
  const list = useRef(null)
  const clickOutsideHandler = event => {
    if (list.current && !list.current.contains(event.target)) {
      props.closeList()
    }
  }
  const fullScrollHandler = useCallback(() => {
    if (
      list.current.scrollHeight <=
        list.current.scrollTop + list.current.clientHeight &&
      props.fullScroll &&
      !props.loadingOptions
    ) {
      props.fullScroll()
    }
  }, [list.current, props.fullScroll, props.loadingOptions])

  useEffect(() => {
    document.addEventListener('click', clickOutsideHandler)
    if (list.current) {
      list.current.addEventListener('scroll', fullScrollHandler)
    }

    return () => {
      document.removeEventListener('click', clickOutsideHandler)
      if (list.current) {
        list.current.removeEventListener('scroll', fullScrollHandler)
      }
    }
  }, [list.current, fullScrollHandler])

  const newProps = { ...props }

  delete newProps.closeList

  return <StyledSelectList {...newProps} ref={list} />
}

SelectList.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  closeList: PropTypes.func.isRequired,
  fullScroll: PropTypes.func,
  loadingOptions: PropTypes.bool,
}

export { SelectList }
