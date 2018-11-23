import { clearSnackbarMessages } from 'components/SnackbarMessages'
import { Route, Router, Switch } from 'react-router-dom'
import Acknowledgements from 'pages/Acknowledgements'
import createBrowserHistory from 'history/createBrowserHistory'
import createHashHistory from 'history/createHashHistory'
import Home from 'pages/Home'
import isCordova from 'utils/isCordova'
import React from 'react'

const _history = isCordova() ? createHashHistory() : createBrowserHistory()

_history.listen(() => {
  clearSnackbarMessages()
})

export const goToPath = (path, replace) => {
  if (replace) {
    _history.replace(path)
  } else {
    _history.push(path)
  }
}

export const isAtPath = (path) => {
  return _history.location.pathname === path
}

export const Path = {
  home: () => { return '/' },
  acknowledgements: () => { return '/acknowledgements' },
}

const AppNavigation = () => (
  <Router history={_history}>
    <Switch>
      <Route exact path={Path.acknowledgements()} component={Acknowledgements}/>
      <Route path={Path.home()} component={Home}/>
    </Switch>
  </Router>
)

export default AppNavigation
