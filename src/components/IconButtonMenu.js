import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import PropTypes from 'prop-types'
import React from 'react'

class IconButtonMenu extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    icon: PropTypes.node,
    children: PropTypes.any.isRequired,
  }
  static defaultProps = {
    id: 'icon-button-menu-id',
    icon: <Icon>menu</Icon>,
  }
  state = {
    anchorEl: null,
  }
  openMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget })
  }
  closeMenu = () => {
    this.setState({ anchorEl: null })
  }
  render() {
    const { id, icon, children, ...menuProps } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <React.Fragment>
        <IconButton
          aria-owns={open ? id : null}
          aria-haspopup='true'
          onClick={this.openMenu}
          color='inherit'
        >
          {icon}
        </IconButton>
        <Menu
          {...menuProps}
          id={id}
          anchorEl={anchorEl}
          open={open}
          onClose={this.closeMenu}
        >
          {children}
        </Menu>
      </React.Fragment>
    )

  }
}

export default IconButtonMenu
