import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { config } from '../../../config'
import { BurgerButton } from '../Buttons/BurgerButton'
import { Row } from '../Grid'
import { Logo } from '../Logo/Logo'
import { NavLinks } from '../NavLinks/NavLinks'
import { NavLinksMobile } from '../NavLinks/NavLinksMobile'

const Nav = styled.nav`
  padding: 2rem;
`

export const Navbar = () => {
  const screenType = useSelector(state => state.screen.type)
  const isMobile =
    screenType === config.mobileScreenType ||
    screenType === config.tinyScreenType
  const [toggle, setToggle] = useState(false)
  const toggleButtonHandler = () => {
    setToggle(prev => !prev)
  }
  const burgerButtonActiveClass = toggle ? config.theme.activeClassName : ''
  const nav = useRef(null)
  const [navbarHeight, setNavbarHeight] = useState(0)
  const onResizeHandler = () =>
    setNavbarHeight(nav.current.getBoundingClientRect().height)

  useEffect(() => {
    onResizeHandler()

    window.addEventListener('resize', onResizeHandler)

    return () => window.removeEventListener('resize', onResizeHandler)
  }, [])

  return (
    <>
      <Nav ref={nav}>
        <Row justify='space-between' align='center'>
          <Logo />
          {!isMobile ? (
            <NavLinks />
          ) : (
            <BurgerButton
              className={burgerButtonActiveClass}
              onClick={toggleButtonHandler}
            />
          )}
        </Row>
      </Nav>
      {isMobile && (
        <NavLinksMobile
          toggle={toggle}
          toggleSwitcher={toggleButtonHandler}
          navbarHeight={navbarHeight}
        />
      )}
    </>
  )
}
