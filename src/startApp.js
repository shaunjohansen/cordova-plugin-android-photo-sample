import React from 'react'
import ReactDOM from 'react-dom'
import App from 'ui/App'
import * as serviceWorker from 'serviceWorker'

const IS_CORDOVA = process.env.REACT_APP_IS_CORDOVA

export function start() {
  if (IS_CORDOVA !== 'true') {
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: http://bit.ly/CRA-PWA
    serviceWorker.unregister()
  }

  const reactRoot = document.getElementById('root')
  if (!reactRoot) {
    throw new Error('No element with id="root" found in HTML')
  }

  ReactDOM.render(<App />, reactRoot)
}
