import 'ui/App.css'
import 'ui/index.css'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppTheme from 'ui/theme/Theme'
import ErrorBoundary from 'ui/components/ErrorBoundary'
import logo from 'icons/logo.svg'
import React from 'react'

const App = () => (
  <ErrorBoundary>
    <CssBaseline/>
    <MuiThemeProvider theme={AppTheme}>
      <AppContent/>
    </MuiThemeProvider>
  </ErrorBoundary>
)

const AppContent = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo"/>
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
)

export default App
