/**
 * Simple implementation of an event dispatcher.
 *
 * Adapted from https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
 */
class EventDispatcher {
  constructor() {
    this.listeners = {}
  }

  addEventListener = (type, callback) => {
    if (!(type in this.listeners)) {
      this.listeners[type] = []
    }
    this.listeners[type].push(callback)
    return function() {
      this.removeEventListener(type, callback)
    }
  }

  removeEventListener = (type, callback) => {
    if (!(type in this.listeners)) {
      return
    }
    var stack = this.listeners[type]
    for (var i = 0, l = stack.length; i < l; i++) {
      if (stack[i] === callback) {
        stack.splice(i, 1)
        return this.removeEventListener(type, callback)
      }
    }
  }

  dispatchEvent = (event) => {
    if (!(event.type in this.listeners)) {
      return
    }
    var stack = this.listeners[event.type]
    event.target = this
    event.preventDefault = function() {
      event.defaultPrevented = true
    }
    for (var i = 0, l = stack.length; i < l; i++) {
      stack[i].call(this, event)
      if (event.defaultPrevented) {
        return event
      }
    }
    return event
  }
}

export default EventDispatcher
