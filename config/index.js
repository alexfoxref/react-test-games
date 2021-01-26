import { MainPage, GamePage } from '../src/pages'

const tinyScreenType = 'tiny'
const mobileScreenType = 'mobile'
const tabletScreenType = 'tablet'
const desktopScreenType = 'desktop'
const laptopScreenType = 'laptop'
const defaultScreenType = 'default'
const screenTypes = [
  {
    name: tinyScreenType,
    minWidth: 0,
    maxWidth: 599,
    multiplier: 0.8,
  },
  {
    name: mobileScreenType,
    minWidth: 600,
    maxWidth: 767,
    multiplier: 0.8,
  },
  {
    name: tabletScreenType,
    minWidth: 768,
    maxWidth: 1199,
    multiplier: 0.9,
  },
  {
    name: desktopScreenType,
    minWidth: 1200,
    maxWidth: 1999,
    multiplier: 1,
  },
  {
    name: laptopScreenType,
    minWidth: 2000,
    maxWidth: Infinity,
    multiplier: 1.2,
  },
  {
    name: defaultScreenType,
    minWidth: 0,
    maxWidth: Infinity,
    multiplier: 1,
  },
]

const defaultFontSize = 20
const fontSizes = screenTypes.reduce((acc, { name, multiplier }) => {
  acc[name] = defaultFontSize * multiplier

  return acc
}, {})

export const config = {
  tinyScreenType,
  mobileScreenType,
  tabletScreenType,
  desktopScreenType,
  laptopScreenType,
  defaultScreenType,
  screenTypes,
  routes: [
    {
      key: 'main',
      component: MainPage,
      path: '/',
      exact: true,
    },
    {
      key: 'game',
      component: GamePage,
      path: '/game/:slug',
    },
  ],
  theme: {
    backgroundColor: {
      primary: '#151515',
      secondary: 'rgba(255, 255, 255, .16)',
      third: 'rgba(255, 255, 255, .07)',
      active: '#ffffff',
      selected: 'rgba(0, 0, 0, .16)',
    },
    textColor: {
      primary: 'rgba(255, 255, 255, 1)',
      secondary: 'rgba(255, 255, 255, .4)',
      active: '#000000',
      hover: 'rgba(0, 0, 0, .6)',
    },
    fontSizes,
    activeClassName: 'active',
    animationTime: 200,
  },
  navLinks: [
    {
      key: 'nav-main',
      to: '/',
      title: 'Главная',
    },
  ],
  search: {
    searchDelay: 1000,
    searchPlaceholder: 'Введите название игры',
    search: '',
    sortPlaceholder: 'Сортировка',
    sort: [
      { value: '', title: 'без сортировки', selected: true },
      { value: 'rating', title: 'по рейтингу' },
      { value: 'released', title: 'по дате релиза' },
    ],
    sort_direction: 'asc',
    filterPlaceholder: 'Платформы',
    filter: [{ value: '', title: 'Все', selected: true }],
  },
  api: {
    API_KEY: 'e34974736ed04957b7d3887739170a16',
    API_BASE: 'https://api.rawg.io/api',
    startPage: 1,
    page_size: 20,
    games: {
      path: '/games',
    },
    screenshots: {
      path: game_pk => `/games/${game_pk}/screenshots`,
    },
    details: {
      path: id => `/games/${id}`,
    },
    platforms: {
      path: '/platforms',
    },
  },
}

// GET https://api.rawg.io/api/platforms?key=YOUR_API_KEY
// GET https://api.rawg.io/api/games?key=YOUR_API_KEY&dates=2019-09-01,2019-09-30&platforms=18,1,7
