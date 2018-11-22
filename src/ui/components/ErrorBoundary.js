import Button from '@material-ui/core/Button'
import getErrorMessage from 'utils/getErrorMessage'
import PropTypes from 'prop-types'
import React from 'react'

//
// Display errors in React components to the user.
//
// @see https://reactjs.org/docs/error-boundaries.html
//
class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  }
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      info: null,
    }
  }
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true, error, info })

    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info)
    console.error('ErrorBoundary.componentDidCatch error:', error)
    console.error('ErrorBoundary.componentDidCatch info:', info)
  }
  restart = () => {
    window.location.reload()
  }
  render() {
    if (this.state.hasError) {
      return <div>
        <h1>Something went wrong.</h1>
        <div>Error: {getErrorMessage(this.state.error)}</div>
        <Button variant='contained' color='primary'
          onClick={this.restart}>Restart the app</Button>
      </div>
    }
    return this.props.children
  }
}

export default ErrorBoundary
