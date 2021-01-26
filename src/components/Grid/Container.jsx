import React from 'react'
import { Flex } from './Flex'

export const Container = props => {
  const newProps = { ...props, direction: 'column' }

  return <Flex {...newProps} />
}
