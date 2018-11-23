import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import AppIcon from 'icons/AppLogo'
import AppMenu from 'app/AppMenu'
import PropTypes from 'prop-types'
import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const APP_LOGO_SIZE = 36

class MainAppBar extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    classes: PropTypes.object.isRequired,
  }
  render() {
    const { classes, title } = this.props

    return (
      <AppBar position='static' color='default'>
        <Toolbar className={classes.toolbar}>
          <AppIcon className={classes.appIcon}/>
          <div className={classes.content}>
            <Typography variant='title' color='inherit' className={classes.title}>
              {title}
            </Typography>
          </div>
          <div className={classes.rhs}>
            <AppMenu/>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}

const styles = theme => ({
  appIcon: {
    width: APP_LOGO_SIZE,
    height: APP_LOGO_SIZE,
  },
  rhs: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: theme.spacing.unit,
  },
  title: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
})

export default withStyles(styles)(MainAppBar)
