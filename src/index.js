import importJs from 'utils/importJs'

// must import react to access process.env.REACT_APP_* configuration vars
import 'react'

//
// Note: in a cordova environment it is important that we do as little work as possible in JavaScript before the
// 'deviceready' event is fired. This is especially important on lower-end devices where thread contention between
// cordova's native loading and JavaScript initialization increases app start time.
//

const IS_CORDOVA = process.env.REACT_APP_IS_CORDOVA

if (IS_CORDOVA !== 'true') {
  doStartApp()
} else {
  // Cordova fires a deviceready event when Cordova has loaded
  importJs('cordova.js')
  window.document.addEventListener('deviceready', function() {
    // our application code can now assume that deviceready has fired, thus simplifying access to plugins
    doStartApp()
  })
}

// loads the second bundle and executes the app startup procedure
function doStartApp() {
  return import('startApp').then((startApp) => {
    startApp.start()
  })
}
