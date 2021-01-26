import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 2.5%;
  background-color: ${({ theme }) => theme.backgroundColor.active || '#ffffff'};
  border-radius: 4px;
  width: 95%;
  cursor: pointer;
  transition: all ease ${({ theme }) => theme.animationTime / 1000 || '.2'}s;

  &:hover {
    margin: 0;
    width: 100%;
  }
`

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  img {
    max-width: 140%;
    min-height: 100%;
    background-size: contain;
  }
`

const ContentContainer = styled.div`
  flex: 1 1 auto;
  padding: 5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${({ theme }) => theme.textColor.active || '#000000'};

  div {
    margin-bottom: 0.5rem;

    &:first-child {
      height: 100px;
    }
  }
`

const GamePlate = props => {
  return (
    <StyledDiv onClick={props.onClick}>
      <ImageContainer>
        {props.background_image ? (
          <img src={props.background_image} alt={props.slug} />
        ) : (
          <span>Изображение отсутствует</span>
        )}
      </ImageContainer>
      <ContentContainer>
        <div>
          <small>Название:</small>&nbsp;
          <h2>{props.name || 'Данные отсутствуют'}</h2>
        </div>
        <div>
          <small>Рейтинг:</small>&nbsp;
          <strong>{props.rating || 'Данные отсутствуют'}</strong>
        </div>
        <div>
          <small>Дата релиза:</small>&nbsp;
          <strong>
            {props.released
              ? new Date(props.released).toLocaleDateString()
              : 'Данные отсутствуют'}
          </strong>
        </div>
      </ContentContainer>
    </StyledDiv>
  )
}

GamePlate.propTypes = {
  onClick: PropTypes.func,
  slug: PropTypes.string,
  name: PropTypes.string,
  released: PropTypes.string,
  rating: PropTypes.number,
  rating_top: PropTypes.number,
  background_image: PropTypes.string,
}

export { GamePlate }
