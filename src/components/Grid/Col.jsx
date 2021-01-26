import React from 'react'
import { Flex } from './Flex'

export const Col = props => {
  const newProps = { ...props, direction: 'column' }

  return <Flex {...newProps} />
}
