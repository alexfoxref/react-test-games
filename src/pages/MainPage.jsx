import React from 'react'
import GamesList from '../components/GamesList/GamesList'
import { Container, Row } from '../components/Grid'
import { SearchPanel } from '../components/SearchPanel/SearchPanel'

export const MainPage = () => {
  return (
    <Container margin='.5rem 5%' width='90%' height='100%'>
      <SearchPanel />
      <GamesList />
    </Container>
  )
}
