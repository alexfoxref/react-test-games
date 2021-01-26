import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SliderScreen } from './SliderScreen'

export const slidesPerPreview = 6
export const multiple = 0.5
const step = 1

const SliderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Slider = props => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideStartTouchPosition = useRef(null)
  const [slideDisplacement, setSlideDisplacement] = useState(0)
  const [listDisplacement, setListDisplacement] = useState(0)

  const goTo = num => {
    if (num < 0) {
      setCurrentSlide(props.images.length - (-num % props.images.length))
    } else if (num >= props.images.length) {
      setCurrentSlide(num % props.images.length)
    } else {
      setCurrentSlide(num)
    }
  }

  const goBack = () => {
    if (currentSlide - step >= 0) {
      goTo(currentSlide - step)
    }
  }
  const goForward = () => {
    if (currentSlide + step < props.images.length) {
      goTo(currentSlide + step)
    }
  }

  const navigationClickHandler = (direction, disabled) => {
    if (!disabled) {
      if (direction === 'back') {
        goBack()
      } else if (direction === 'forward') {
        goForward()
      }
    }
  }

  const slideTouchStartHandler = (event, preview) => {
    if (!preview) {
      slideStartTouchPosition.current = event.touches[0].clientX
    } else {
      slideStartTouchPosition.current = event.touches[0].clientX
    }
  }
  const slideTouchMoveHandler = (event, preview) => {
    const currentSlideTouchPosition = event.touches[0].clientX
    if (!preview) {
      setSlideDisplacement(
        currentSlideTouchPosition - slideStartTouchPosition.current
      )
    } else {
      setListDisplacement(
        currentSlideTouchPosition - slideStartTouchPosition.current
      )
    }
  }
  const slideTouchEndHandler = (event, preview, idx) => {
    event.preventDefault()

    if (!preview) {
      if (slideDisplacement < -50) {
        goForward()
      } else if (slideDisplacement > 50) {
        goBack()
      }

      setSlideDisplacement(0)
    } else {
      if (listDisplacement > -20 && listDisplacement < 20) {
        goTo(idx)
      } else if (listDisplacement < -50) {
        goForward()
      } else if (listDisplacement > 50) {
        goBack()
      }

      setListDisplacement(0)
    }
  }

  return (
    <SliderWrapper {...props}>
      <SliderScreen
        {...props}
        navigationClick={navigationClickHandler}
        currentSlide={currentSlide}
        preview={true}
        chooseSlide={goTo}
        slideTouchMove={slideTouchMoveHandler}
        slideTouchEnd={slideTouchEndHandler}
        slideTouchStart={slideTouchStartHandler}
      />

      <SliderScreen
        {...props}
        navigationClick={navigationClickHandler}
        currentSlide={currentSlide}
        slideTouchMove={slideTouchMoveHandler}
        slideTouchEnd={slideTouchEndHandler}
        slideTouchStart={slideTouchStartHandler}
        slideDisplacement={slideDisplacement}
      />
    </SliderWrapper>
  )
}

Slider.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
  isMobile: PropTypes.bool,
  imagesEnd: PropTypes.func,
  loadingImages: PropTypes.bool,
}

export { Slider }
