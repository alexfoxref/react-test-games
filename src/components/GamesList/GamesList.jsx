import React, { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestActions } from '../../store/actions/requestActions'
import { config } from '../../../config'
import { dataActions } from '../../store/actions/dataActions'
import { push } from 'react-router-redux'
import { Col, Row } from '../Grid'
import { GamePlate } from '../GamePlate/GamePlate'
import { Loader } from '../Loader/Loader'

const GamesList = () => {
  const screenType = useSelector(state => state.screen.type)
  const { games, gamesPage, isLastGamesPage } = useSelector(state => state.data)
  const {
    loading: { games: gamesLoading },
  } = useSelector(state => state.request)
  const dispatch = useDispatch()
  const toOutside = useRef(false)
  const basis =
    screenType === config.tinyScreenType
      ? '100%'
      : screenType === config.mobileScreenType
      ? '50%'
      : screenType === config.tabletScreenType
      ? '33%'
      : screenType === config.desktopScreenType
      ? '25%'
      : screenType === config.laptopScreenType
      ? '20%'
      : '25%'

  const onFullScrollHandler = useCallback(() => {
    if (
      document.documentElement.scrollHeight <=
        document.documentElement.scrollTop +
          document.documentElement.clientHeight &&
      !isLastGamesPage &&
      !gamesLoading &&
      !toOutside.current
    ) {
      dispatch(dataActions.setGamesPage(gamesPage + 1))
      dispatch(requestActions.addGamesList(gamesPage + 1))
    }
  }, [dispatch, isLastGamesPage, gamesPage, gamesLoading, toOutside.current])

  useEffect(() => {
    toOutside.current = false
    document.addEventListener('scroll', onFullScrollHandler)

    return () => {
      document.removeEventListener('scroll', onFullScrollHandler)
    }
  }, [onFullScrollHandler])

  useEffect(() => {
    if (
      games.length < config.api.page_size &&
      !isLastGamesPage &&
      !gamesLoading
    ) {
      dispatch(requestActions.setGamesList(config.api.startPage))
    }
  }, [games.length, isLastGamesPage, gamesLoading])

  const clickHandler = slug => {
    toOutside.current = true
    dispatch(push(`/game/${slug}`))
  }

  return (
    <Row width='100%' height='100%'>
      {games.length === 0 && !gamesLoading && (
        <span>Игр по данному запросу не найдено</span>
      )}
      {games.map(
        ({
          id,
          slug,
          name,
          released,
          rating,
          rating_top,
          background_image,
        }) => {
          const props = {
            slug,
            name,
            released,
            rating,
            rating_top,
            background_image,
          }
          return (
            <Col key={id} basis={basis}>
              <GamePlate {...props} onClick={() => clickHandler(slug)} />
            </Col>
          )
        }
      )}
      {gamesLoading && <Loader color={config.theme.backgroundColor.active} />}
    </Row>
  )
}

export default GamesList
