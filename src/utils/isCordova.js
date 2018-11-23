// must import React to access process.env.REACT_APP_* configuration vars
import 'react'

// eslint-disable-next-line no-undef
const IS_CORDOVA = process.env.REACT_APP_IS_CORDOVA === 'true'

//
// Identifies whether this app is built for Cordova.
//
const isCordova = () => {
  return IS_CORDOVA
}

export default isCordova
