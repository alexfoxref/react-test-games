import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory, store } from './store/store'
import { App } from './App'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { config } from '../config'

const Global = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Roboto', sans-serif;
  	font-weight: normal;
	}

	#app {
		width: 100%;
		height: 100%;
		overflow-x: hidden;
	}
`

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      <ThemeProvider theme={config.theme}>
        <Global />
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('app')
)
