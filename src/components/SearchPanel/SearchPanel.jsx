import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Col, Row } from '../Grid'
import { Sort } from '../Sort/Sort'
import { Filter } from '../Filter/Filter'
import { Search } from '../Search/Search'
import { useDispatch, useSelector } from 'react-redux'
import { config } from '../../../config'
import { searchActions } from '../../store/actions/searchActions'
import { requestActions } from '../../store/actions/requestActions'
import { dataActions } from '../../store/actions/dataActions'

export const SearchPanel = () => {
  const [delay, setDelay] = useState({ games: false, platforms: false })
  const screenType = useSelector(state => state.screen.type)
  const {
    loading: { platforms: platformsLoading },
  } = useSelector(state => state.request)
  const isTiny = screenType === config.tinyScreenType
  const isMobile = isTiny || screenType === config.mobileScreenType
  const { search, sort, sort_direction, filter } = useSelector(
    state => state.search
  )
  const {
    platforms,
    gamesPage,
    platformsPage,
    isLastPlatformsPage,
  } = useSelector(state => state.data)
  const prevSearch = useRef(search)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!delay.games && search !== prevSearch.current) {
      prevSearch.current = search

      dispatch(dataActions.setGames([]))
      dispatch(requestActions.setGamesList(gamesPage))
    }
  }, [dispatch, search, delay.games, gamesPage])

  useEffect(() => {
    if (platforms.length < 2 && !platformsLoading) {
      dispatch(requestActions.addPlatformsList(platformsPage))
    }
  }, [platforms, platformsLoading])

  const setPageWithTimeout = () => {
    dispatch(dataActions.setGamesPage(config.api.startPage))
    setDelay(prev => ({ ...prev, games: false }))
  }
  const onSearchChangeHandler = event => {
    dispatch(searchActions.setSearch(event.target.value))

    if (!delay.games) {
      setDelay(prev => ({ ...prev, games: true }))

      setTimeout(setPageWithTimeout, config.search.searchDelay)
    }
  }
  const onSortChangeHandler = value => {
    dispatch(dataActions.setGames([]))
    dispatch(dataActions.setGamesPage(config.api.startPage))
    dispatch(searchActions.setSort(value))
    dispatch(requestActions.setGamesList(config.api.startPage))
  }
  const onSortDirectionChangeHandler = value => {
    dispatch(dataActions.setGames([]))
    dispatch(dataActions.setGamesPage(config.api.startPage))
    dispatch(searchActions.setSortDirection(value))
    dispatch(requestActions.setGamesList(config.api.startPage))
  }
  const onFilterChangeHandler = value => {
    dispatch(dataActions.setGames([]))
    dispatch(dataActions.setGamesPage(config.api.startPage))
    dispatch(searchActions.setFilter(value))
    dispatch(requestActions.setGamesList(config.api.startPage))
  }
  const onFullScrollHandler = useCallback(() => {
    if (!isLastPlatformsPage) {
      dispatch(dataActions.setPlatformsPage(platformsPage + 1))
      dispatch(requestActions.addPlatformsList(platformsPage + 1))
    }
  }, [isLastPlatformsPage, platformsPage])

  return (
    <>
      <Row align='center' width='100%' padding='.5rem'>
        <Col basis='100%' justify='space-between' align='center'>
          <Search
            screenType={screenType}
            value={search}
            onChange={onSearchChangeHandler}
            placeholder={config.search.searchPlaceholder}
          />
        </Col>
      </Row>
      <Row align='center' width='100%' padding='.5rem'>
        <Col basis={isMobile ? '100%' : '47.5%'} margin='0 5% .5rem 0'>
          <Sort
            screenType={screenType}
            value={sort}
            onChange={onSortChangeHandler}
            placeholder={config.search.sortPlaceholder}
            direction={sort_direction}
            onChangeDirection={onSortDirectionChangeHandler}
          />
        </Col>
        <Col basis={isMobile ? '100%' : '47.5%'} margin='0 0 .5rem 0'>
          <Filter
            screenType={screenType}
            value={filter}
            onChange={onFilterChangeHandler}
            placeholder={config.search.filterPlaceholder}
            options={platforms}
            loadingOptions={platformsLoading}
            fullScroll={onFullScrollHandler}
          />
        </Col>
      </Row>
    </>
  )
}
