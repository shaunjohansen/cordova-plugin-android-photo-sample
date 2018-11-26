//
// Identifies whether this app is running on Android.
//
const isAndroid = () => {
  return navigator.userAgent.toLowerCase().indexOf('android') > -1
}

export default isAndroid
