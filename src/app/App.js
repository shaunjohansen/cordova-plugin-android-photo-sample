import * as serviceWorker from 'serviceWorker'
import { MuiThemeProvider } from '@material-ui/core/styles'
import AppNavigation from 'app/AppNavigation'
import AppTheme from 'app/Theme'
import CssBaseline from '@material-ui/core/CssBaseline'
import ErrorBoundary from 'components/ErrorBoundary'
import isCordova from 'utils/isCordova'
import React from 'react'
import ReactDOM from 'react-dom'
import SnackbarMessages from 'components/SnackbarMessages'

//
// Initializes Material-UI css and theme, wraps React components in ErrorBoundary.
//
const App = () => (
  <ErrorBoundary>
    <CssBaseline/>
    <MuiThemeProvider theme={AppTheme}>
      <AppNavigation/>
    </MuiThemeProvider>
    <SnackbarMessages/>
  </ErrorBoundary>
)

export function start() {
  const reactRoot = document.getElementById('root')
  if (!reactRoot) {
    throw new Error('No element with id="root" found in HTML')
  }

  if (isCordova()) {
    initCordovaApp()
  } else {
    initWebApp()
  }

  ReactDOM.render(<App/>, reactRoot)
}

const initCordovaApp = () => {
  // // Implement back button for Android
  // // see https://developer.android.com/training/implementing-navigation/temporal
  // document.addEventListener('backbutton', (e) => {
  //   // disable back button for the entire app (not recommended, but this is how to do it):
  //   e.preventDefault()
  // }, false)
}

const initWebApp = () => {
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: http://bit.ly/CRA-PWA
  serviceWorker.unregister()
}
