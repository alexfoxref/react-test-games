import React from 'react'
import PropTypes from 'prop-types'
import { Input } from '../Inputs/Input'

const Search = props => {
  return (
    <>
      <Input {...props} />
    </>
  )
}

Search.propTypes = {
  screenType: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}

export { Search }
