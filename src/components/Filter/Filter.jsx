import React from 'react'
import PropTypes from 'prop-types'
import { Select } from '../Selects/Select'
import { Row } from '../Grid'

const Filter = ({
  screenType,
  value,
  onChange,
  placeholder,
  options,
  fullScroll,
  loadingOptions,
}) => {
  return (
    <Row width='100%'>
      <Select
        value={value}
        options={options}
        chooseOption={onChange}
        screenType={screenType}
        label={placeholder}
        multiselect
        fullScroll={fullScroll}
        loadingOptions={loadingOptions}
      />
    </Row>
  )
}

Filter.propTypes = {
  screenType: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired,
  fullScroll: PropTypes.func,
  loadingOptions: PropTypes.bool,
}

export { Filter }
