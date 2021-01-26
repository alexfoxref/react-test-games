import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SliderList } from './SliderList'
import { SliderButton } from './SliderButton'
import { slidesPerPreview } from './Slider'

const StyledSliderScreen = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  z-index: 5;

  & > div {
    opacity: 0;
    transition: all ease ${({ theme }) => theme.animationTime / 1000 || '.2'}s;
  }

  &:hover {
    & > div {
      opacity: 1;
    }
  }
`
const SliderNavigation = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 6;
  width: 90%;
  height: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SliderScreen = ({
  images = [],
  isMobile = false,
  navigationClick = () => {},
  currentSlide = 0,
  preview = false,
  chooseSlide = () => {},
  imagesEnd = () => {},
  slideTouchMove = () => {},
  slideTouchEnd = () => {},
  slideTouchStart = () => {},
  slideDisplacement = 0,
}) => {
  useEffect(() => {
    if (
      (!preview && currentSlide === images.length - 1) ||
      (preview &&
        currentSlide >= images.length - Math.floor(slidesPerPreview / 2))
    ) {
      imagesEnd()
    }
  }, [preview, currentSlide, images.length, imagesEnd])

  return (
    <StyledSliderScreen preview={preview}>
      {!isMobile && (
        <SliderNavigation>
          <SliderButton
            direction='back'
            navigationClick={direction =>
              navigationClick(direction, currentSlide === 0)
            }
            disabled={currentSlide === 0}
          />
          <SliderButton
            direction='forward'
            navigationClick={direction =>
              navigationClick(direction, currentSlide === images.length - 1)
            }
            disabled={currentSlide === images.length - 1}
          />
        </SliderNavigation>
      )}
      <SliderList
        images={images}
        currentSlide={currentSlide}
        preview={preview}
        chooseSlide={chooseSlide}
        slideTouchMove={slideTouchMove}
        slideTouchEnd={slideTouchEnd}
        slideTouchStart={slideTouchStart}
        slideDisplacement={slideDisplacement}
      />
    </StyledSliderScreen>
  )
}

SliderScreen.propTypes = {
  sliderWidth: PropTypes.number,
  navigationClick: PropTypes.func,
  currentSlide: PropTypes.number,
  preview: PropTypes.bool,
  chooseSlide: PropTypes.func,
  imagesEnd: PropTypes.func,
  slideTouchMove: PropTypes.func,
  slideTouchEnd: PropTypes.func,
  slideTouchStart: PropTypes.func,
  slideDisplacement: PropTypes.number,
}

export { SliderScreen }
