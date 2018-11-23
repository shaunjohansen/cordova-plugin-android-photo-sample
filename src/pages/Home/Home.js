import { withStyles } from '@material-ui/core/styles'
import MainAppBar from 'app/MainAppBar'
import PageSkeleton from 'components/PageSkeleton'
import React from 'react'
import Typography from '@material-ui/core/Typography'

const Home = class extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <PageSkeleton appBar={<MainAppBar title='Take a Picture'/>}>
        <Typography className={classes.topText}>
          TODO: add app ui
        </Typography>
      </PageSkeleton>
    )
  }
}

const styles = (theme) => ({
  topText: {
    padding: theme.spacing.unit,
  },
})

export default withStyles(styles)(Home)
