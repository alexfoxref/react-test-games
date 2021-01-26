import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { slidesPerPreview } from './Slider'

const StyledSlide = styled.li`
  padding: 0.5%;
  height: 100%;
  min-width: ${({ preview }) =>
    preview ? `${100 / slidesPerPreview}%` : '100%'};
  max-width: ${({ preview }) =>
    preview ? `${100 / slidesPerPreview}%` : '100%'};
  overflow: hidden;

  img {
    width: 100%;
    background-size: contain;
  }

  opacity: ${({ active }) => (active ? '1' : '.5')};
  cursor: ${({ preview }) => (preview ? 'pointer' : 'default')};
`

const Slide = ({
  data: { id, image },
  preview,
  active,
  chooseSlide,
  slideTouchMove,
  slideTouchEnd,
  slideTouchStart,
}) => {
  return (
    <StyledSlide
      preview={preview}
      active={active}
      onClick={() => {
        console.log('click'), chooseSlide()
      }}
      onTouchMove={slideTouchMove}
      onTouchEnd={slideTouchEnd}
      onTouchStart={slideTouchStart}
    >
      <img src={image} alt={`${preview ? 'preview' : 'slide'}-${id}`} />
    </StyledSlide>
  )
}

Slide.propTypes = {
  data: PropTypes.object.isRequired,
  preview: PropTypes.bool,
  active: PropTypes.bool,
  chooseSlide: PropTypes.func,
  slideTouchEnd: PropTypes.func,
  slideTouchMove: PropTypes.func,
  slideTouchStart: PropTypes.func,
}

export { Slide }
