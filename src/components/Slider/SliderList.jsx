import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Slide } from './Slide'
import { multiple, slidesPerPreview } from './Slider'

const StyledSliderList = styled.ul.attrs(
  ({ currentSlide, preview, slidesLength, slideDisplacement }) => {
    const sideSlides = Math.floor(slidesPerPreview / 2)
    let translate = 0

    if (preview) {
      if (currentSlide <= sideSlides) {
        translate = 0
      } else if (
        currentSlide > sideSlides &&
        currentSlide < slidesLength - sideSlides
      ) {
        translate = ((currentSlide - sideSlides) * 100) / slidesPerPreview
      } else {
        translate = ((slidesLength - 2 * sideSlides) * 100) / slidesPerPreview
      }
    } else {
      translate = currentSlide * 100 - slideDisplacement * multiple
    }

    return {
      style: {
        transform: `translateX(-${translate}%)`,
      },
    }
  }
)`
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  list-style: none;
  transition: all ease ${({ theme }) => theme.animationTime / 1000 || '.2'}s;
  margin-bottom: 0.5rem;

  ${({ preview, slidesLength }) =>
    preview && slidesLength < slidesPerPreview
      ? `
		justify-content: center;
	`
      : ''}
`

const SliderList = ({
  images,
  currentSlide,
  preview,
  chooseSlide,
  slideTouchEnd,
  slideTouchMove,
  slideTouchStart,
  slideDisplacement,
}) => {
  return (
    <StyledSliderList
      currentSlide={currentSlide}
      preview={preview}
      slidesLength={images.length}
      slideDisplacement={slideDisplacement}
    >
      {images.map((image, idx) => (
        <Slide
          key={image.id}
          data={image}
          preview={preview}
          active={currentSlide === idx}
          chooseSlide={() => chooseSlide(idx)}
          slideTouchEnd={e => slideTouchEnd(e, preview, idx)}
          slideTouchMove={e => slideTouchMove(e, preview)}
          slideTouchStart={e => slideTouchStart(e, preview)}
        />
      ))}
    </StyledSliderList>
  )
}

SliderList.propTypes = {
  currentSlide: PropTypes.number,
  preview: PropTypes.bool,
  chooseSlide: PropTypes.func,
  slideTouchMove: PropTypes.func,
  slideTouchEnd: PropTypes.func,
  slideTouchStart: PropTypes.func,
  slideDisplacement: PropTypes.number,
}

export { SliderList }
