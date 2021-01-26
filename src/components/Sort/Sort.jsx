import React from 'react'
import PropTypes from 'prop-types'
import { Select } from '../Selects/Select'
import { SortButton } from '../Buttons/SortButton'
import { Row } from '../Grid'
import { config } from '../../../config'

const Sort = ({
  screenType,
  value,
  onChange,
  placeholder,
  direction,
  onChangeDirection,
}) => {
  return (
    <Row width='100%'>
      <Select
        value={value}
        options={config.search.sort}
        chooseOption={onChange}
        screenType={screenType}
        label={placeholder}
        margin='0 .5rem 0 0'
      />
      <SortButton
        direction={direction}
        chooseDirection={onChangeDirection}
        value={value}
      />
    </Row>
  )
}

Sort.propTypes = {
  screenType: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  direction: PropTypes.string.isRequired,
  onChangeDirection: PropTypes.func.isRequired,
}

export { Sort }
