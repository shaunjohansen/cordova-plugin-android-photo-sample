import * as serviceWorker from 'serviceWorker'
import App from 'app/App'
import isCordova from 'utils/isCordova'
import React from 'react'
import ReactDOM from 'react-dom'

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
