import React, { useState, useRef, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { config } from '../../../config'
import { NavLink } from '../Link/NavLink'
import { Li } from './styles'
import styled from 'styled-components'
import { push } from 'react-router-redux'

const UlMobile = styled.ul`
  list-style: none;
  display: ${({ toggle }) => (toggle ? 'flex' : 'none')};
  margin: 0;
  padding: 0;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  font-size: 1rem;
  position: fixed;
  z-index: 20;
  right: 0;
  top: ${props => props.navbarHeight};
  background-color: ${props => props.theme.backgroundColor.primary};
  height: ${props =>
    document.documentElement.scrollHeight - props.navbarHeight}px;
`

const LiMobile = styled(Li)`
  margin: 0.5rem 0;
  padding: 0;
  width: ${props => (props.toggle ? 300 : 0)}px;
  max-width: 100%;
  transition: all ease ${props => props.theme.animationTime / 1000}s;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  &:after {
    width: 90%;
    height: 1px;
    margin: 0 5%;
  }
`

const NavLinksMobile = ({ toggle = false, toggleSwitcher, navbarHeight }) => {
  const [touchPositionX, setTouchPositionX] = useState(0)
  const [menuPosition, setMenuPosition] = useState(0)
  const list = useRef(null)

  const touchOutsideHandler = useCallback(
    event => {
      if (list.current && toggle && !list.current.contains(event.target)) {
        event.preventDefault()
        toggleSwitcher()
      }
    },
    [list.current, toggle]
  )

  useEffect(() => {
    document.addEventListener('touchend', touchOutsideHandler)

    return () => {
      document.removeEventListener('touchend', touchOutsideHandler)
    }
  }, [touchOutsideHandler])

  const setPositionHandler = event => {
    setTouchPositionX(event.changedTouches[0].clientX)
  }
  const changePositionHandler = event => {
    if (event.changedTouches[0].clientX > touchPositionX) {
      setMenuPosition(touchPositionX - event.changedTouches[0].clientX)
    }
  }
  const closeMenuHandler = event => {
    if (event.changedTouches[0].clientX > touchPositionX) {
      toggleSwitcher()
      setTimeout(() => setMenuPosition(0), config.theme.animationTime)
    }
  }

  return (
    <UlMobile
      className='justify-between'
      navbarHeight={navbarHeight}
      onTouchStart={setPositionHandler}
      onTouchMove={changePositionHandler}
      onTouchEnd={closeMenuHandler}
      style={{ right: `${menuPosition}px` }}
      toggle={toggle}
      ref={list}
    >
      {config.navLinks.map(({ to, key, title }) => (
        <LiMobile
          key={key}
          toggle={toggle}
          onClick={() => {
            toggleSwitcher()
            push(to)
          }}
        >
          <NavLink to={to} title={title} />
        </LiMobile>
      ))}
    </UlMobile>
  )
}

NavLinksMobile.propTypes = {
  toggle: PropTypes.bool,
  toggleSwitcher: PropTypes.func.isRequired,
  navbarHeight: PropTypes.number.isRequired,
}

export { NavLinksMobile }
