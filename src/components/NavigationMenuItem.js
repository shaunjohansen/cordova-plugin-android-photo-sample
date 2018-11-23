import { isAtPath } from 'app/AppNavigation'
import { Link } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem'
import PropTypes from 'prop-types'
import React from 'react'

//
// Displays a menu when not currently viewing the specified path.
//
const NavigationMenuItem = class extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }
  render() {
    const { path, title, ...menuProps } = this.props

    if (isAtPath(path)) {
      return null
    }

    return <MenuItem component={Link} to={path}{...menuProps}>{title}</MenuItem>
  }
}

export default NavigationMenuItem
