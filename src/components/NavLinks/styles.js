import styled from 'styled-components'
import { config } from '../../../config'

export const Ul = styled.ul`
  display: flex;
  list-style: none;
`

export const Li = styled.li`
  position: relative;
  margin-right: 2rem;

  &:after {
    content: '';
    width: 100%;
    height: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: ${config.theme.textColor.secondary};
    transition: all ease ${config.animationTime / 1000}s;
  }

  &:hover {
    a {
      color: ${config.theme.textColor.primary};
    }

    &:after {
      height: 2px;
      background-color: ${config.theme.textColor.primary};
    }
  }
`
