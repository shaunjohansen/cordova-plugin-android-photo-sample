import { Path } from 'app/AppNavigation'
import IconButtonMenu from 'components/IconButtonMenu'
import MoreVert from '@material-ui/icons/MoreVert'
import NavigationMenuItem from 'components/NavigationMenuItem'
import React from 'react'

class AppMenu extends React.Component {
  constructor() {
    super()
    this.menuRef = React.createRef()
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
        <NavigationMenuItem title='Home' path={Path.home()}/>
        <NavigationMenuItem title='Acknowledgements' path={Path.acknowledgements()}/>
      </IconButtonMenu>
    )
  }
}

export default AppMenu
