import React from 'react'
import { config } from '../../../config'
import { NavLink } from '../Link/NavLink'
import { Li, Ul } from './styles'

export const NavLinks = () => {
  return (
    <Ul className='justify-between'>
      {config.navLinks.map(({ to, key, title }) => (
        <Li key={key}>
          <NavLink to={to} title={title} />
        </Li>
      ))}
    </Ul>
  )
}
