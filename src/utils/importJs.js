//
// dynamically loads a javascript library by uri
//
function importJs(src) {
  if (!_loadedElements[src]) {
    _loadedElements[src] = true

    var scriptElement = document.createElement('script')
    scriptElement.type = 'text/javascript'
    scriptElement.async = false
    scriptElement.crossorigin = 'anonymous'
    window.document.head.appendChild(scriptElement)
    scriptElement.src = src
  }
  return _loadedElements[src]
}

// internal set of already imported src locations, to avoid double-importing
const _loadedElements = {}

export default importJs
