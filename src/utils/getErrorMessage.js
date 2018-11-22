import _ from 'lodash'

// A common method for turning an error object into a string.
function getErrorMessage(error) {
  let message = _.get(error, 'message')
  if (!message) {
    message = _.get(error, 'bodyText')
  }
  if (!message) {
    message = `${error}`
  }
  return message
}

export default getErrorMessage
