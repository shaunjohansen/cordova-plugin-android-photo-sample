import * as serviceWorker from 'serviceWorker'
import App from 'app/App'
import isCordova from 'utils/isCordova'
import React from 'react'
import ReactDOM from 'react-dom'

export function start() {
  if (!isCordova()) {
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: http://bit.ly/CRA-PWA
    serviceWorker.unregister()
  }

  const reactRoot = document.getElementById('root')
  if (!reactRoot) {
    throw new Error('No element with id="root" found in HTML')
  }

  ReactDOM.render(<App/>, reactRoot)
}
