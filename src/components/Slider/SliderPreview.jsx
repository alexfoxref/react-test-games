import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SliderButton } from './SliderButton'
import { SliderList } from './SliderList'

const SliderNavigation = styled.div`
  width: 90%;
  height: 0;
  margin: 0 5%;
  margin-bottom: ${({ previewHeight }) =>
    previewHeight ? `-${previewHeight / 2}px` : '-100px'};
  display: flex;
  justify-content: space-between;
`
const StyledSliderPreview = styled.div`
  width: ${({ sliderWidth }) =>
    sliderWidth ? `${sliderWidth * 0.8}px` : '80%'};
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

const SliderPreview = ({ images, isMobile, sliderWidth }) => {
  return (
    <StyledSliderPreview sliderWidth={sliderWidth}>
      {!isMobile && (
        <SliderNavigation>
          <SliderButton direction='back' />
          <SliderButton direction='forward' />
        </SliderNavigation>
      )}
      <SliderList images={images} preview />
    </StyledSliderPreview>
  )
}

SliderPreview.propTypes = {
  sliderWidth: PropTypes.number,
}

export { SliderPreview }
