import IconButtonMenu from 'components/IconButtonMenu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVert from '@material-ui/icons/MoreVert'
import React from 'react'

class AppMenu extends React.Component {
  constructor() {
    super()
    this.menuRef = React.createRef()
  }
  handleExample = () => {
    this.menuRef.current.closeMenu()

    console.log('TODO: implement app menus')
  }
  render() {
    return (
      <IconButtonMenu
        ref={this.menuRef}
        icon={<MoreVert/>}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={this.handleExample}>Example Menu</MenuItem>
      </IconButtonMenu>
    )
  }
}

export default AppMenu
