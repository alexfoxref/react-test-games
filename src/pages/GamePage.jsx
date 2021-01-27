import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { config } from '../../config'
import { Container } from '../components/Grid'
import { LinkOutside } from '../components/Link/LinkOutside'
import { Loader } from '../components/Loader/Loader'
import { Slider } from '../components/Slider/Slider'
import { dataActions } from '../store/actions/dataActions'
import { requestActions } from '../store/actions/requestActions'

const StyledContainer = styled(Container)`
  background-color: ${({ theme }) => theme.backgroundColor.active || '#ffffff'};
  border-radius: 10px;
  overflow: hidden;
  color: ${({ theme }) => theme.textColor.active || '#000000'};
  min-height: 400px;

  & > span {
    margin: 1rem auto;
  }
`

const ImageContainer = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  & > img {
    width: 100%;
    max-width: 100%;
  }

  & > span {
    color: ${({ theme }) => theme.textColor.active || '#000000'};
  }
`

const ContentContainer = styled.div`
  padding: 2.5%;

  & > div {
    width: 100%;
    margin-bottom: 1.5%;
    font-size: ${({ screenType, theme }) =>
      theme.fontSizes[screenType] * 1.2 || 16}px;

    & > span {
      color: ${({ theme }) => theme.textColor.hover || 'rgba(0, 0, 0, .6)'};
      font-size: ${({ screenType, theme }) =>
        theme.fontSizes[screenType] || 14}px;
    }
  }
`

export const GamePage = () => {
  const screenType = useSelector(state => state.screen.type)
  const {
    loading: { game: gameLoading, screenshots: screenshotsLoading },
  } = useSelector(state => state.request)
  const { games, screenshotsPage, isLastScreenshotsPage } = useSelector(
    state => state.data
  )
  const dispatch = useDispatch()
  const { slug } = useParams()
  const game = games.find(({ slug: sl }) => sl === slug)

  const addScreenshotsHandler = useCallback(() => {
    if (!isLastScreenshotsPage && !screenshotsLoading) {
      dispatch(dataActions.setScreenshotsPage(screenshotsPage + 1))
      dispatch(requestActions.addGameScreenshots(slug, screenshotsPage + 1))
    }
  }, [
    dispatch,
    isLastScreenshotsPage,
    screenshotsLoading,
    screenshotsPage,
    slug,
  ])

  useEffect(() => {
    if (!gameLoading && (!game || !game.withAdditions)) {
      dispatch(requestActions.addGameAdditions(slug))
    }
    if (game && !game.withScreenshots && !screenshotsLoading) {
      dispatch(requestActions.addGameScreenshots(slug, screenshotsPage))
    }
  }, [dispatch, game, screenshotsPage, gameLoading, screenshotsLoading])

  const elementView = (
    param,
    childrenFunc,
    emptyText = 'Данные отсутствуют',
    loaderSize = 0.5
  ) => {
    return game && game[param] ? (
      childrenFunc(game[param])
    ) : !gameLoading ? (
      <span>{emptyText}</span>
    ) : (
      <Loader color={config.theme.backgroundColor.primary} size={loaderSize} />
    )
  }

  return (
    <StyledContainer margin='.5rem 5%' width='90%' height='100%'>
      {game ? (
        <>
          <ImageContainer>
            {elementView(
              'background_image',
              param => (
                <img src={param} alt={slug} />
              ),
              'Изображение отсутствует',
              1
            )}
          </ImageContainer>
          <ContentContainer screenType={screenType}>
            <div>
              <span>Название:</span>&nbsp;
              {elementView(
                'name',
                param => (
                  <h2>{param}</h2>
                ),
                'Название отсутствует'
              )}
            </div>
            <div>
              <span>Рейтинг:</span>&nbsp;
              {elementView('rating', param => (
                <strong>{param}</strong>
              ))}
            </div>
            <div>
              <span>Дата релиза:</span>&nbsp;
              {elementView('released', param => (
                <strong>{new Date(param).toLocaleDateString()}</strong>
              ))}
            </div>
            <div>
              <span>Website:</span>&nbsp;
              {elementView('website', param => (
                <LinkOutside to={param}>
                  <strong>{param}</strong>
                </LinkOutside>
              ))}
            </div>
            <div>
              <span>Описание:</span>&nbsp;
              {elementView(
                'description_raw',
                param => (
                  <p>{param}</p>
                ),
                'Описание отсутствует'
              )}
            </div>
            <div>
              {!game.withScreenshots ? (
                screenshotsLoading ? (
                  <Loader color={config.theme.backgroundColor.primary} />
                ) : (
                  <>
                    <span>Скриншоты:</span>&nbsp;
                    <span>Данные отсутствуют</span>
                  </>
                )
              ) : (
                <Slider
                  images={game.screenshots}
                  imagesEnd={addScreenshotsHandler}
                  loadingImages={screenshotsLoading}
                  isMobile={
                    screenType === config.tinyScreenType ||
                    screenType === config.mobileScreenType ||
                    screenType === config.tabletScreenType
                  }
                />
              )}
            </div>
          </ContentContainer>
        </>
      ) : !gameLoading ? (
        <ContentContainer>
          <div>
            <span>Страница не существует</span>
          </div>
        </ContentContainer>
      ) : (
        <Loader color={config.theme.backgroundColor.primary} />
      )}
    </StyledContainer>
  )
}
