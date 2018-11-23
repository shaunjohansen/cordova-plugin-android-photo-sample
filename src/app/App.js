import { MuiThemeProvider } from '@material-ui/core/styles'
import AppNavigation from 'app/AppNavigation'
import AppTheme from 'app/Theme'
import CssBaseline from '@material-ui/core/CssBaseline'
import ErrorBoundary from 'components/ErrorBoundary'
import React from 'react'
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

export default App
