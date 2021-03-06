import importJs from 'utils/importJs'
import isCordova from 'utils/isCordova'

//
// Note: in a cordova environment it is important that we do as little work as possible in JavaScript before the
// 'deviceready' event is fired. This is especially important on lower-end devices where thread contention between
// cordova's native loading and JavaScript initialization increases app start time.
//

if (!isCordova()) {
  doStartApp()
} else {
  // manually load the cordova.js library provided by the cordova build process
  importJs('cordova.js')
  // wait for the deviceready event before proceeding
  window.document.addEventListener('deviceready', function() {
    // our application code can now assume that deviceready has fired, thus simplifying access to plugins
    doStartApp()
  })
}

// loads the second bundle and executes the app startup procedure
function doStartApp() {
  return import('app/App').then((App) => {
    App.start()
  })
}
