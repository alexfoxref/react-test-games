import React from 'react'
import { Flex } from './Flex'

export const Row = props => {
  const newProps = {
    ...props,
    direction: 'row',
    wrap: 'wrap',
  }

  return <Flex {...newProps} />
}
