// code adapted from https://reacttraining.com/react-router/web/guides/code-splitting

import PropTypes from 'prop-types'
import React from 'react'

class Bundle extends React.Component {
  static propTypes = {
    load: PropTypes.object.isRequired,
  }
  state = {
    loadedModule: null,
  }
  componentDidMount() {
    this.mounted = true
    this.load(this.props)
  }
  componentDidUpdate(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }
  componentWillUnmount() {
    this.mounted = false
  }
  load(props) {
    this.setState({ loadedModule: null })
    props.load.then((loadedModule) => {
      if (this.mounted) {
        this.setState({
          // handle both es imports and cjs
          loadedModule: loadedModule.default || loadedModule,
        })
      }
    }, (error) => {
      console.error('Error loading module', error)
    })
  }
  render() {
    if (!this.state.loadedModule) {
      return null
    }

    return this.props.children(this.state.loadedModule)
  }
}

export default Bundle
