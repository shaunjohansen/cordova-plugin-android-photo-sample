import { withStyles } from '@material-ui/core/styles'
import _ from 'lodash'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MainAppBar from 'app/MainAppBar'
import Package from '../../../package.json'
import PageSkeleton from 'components/PageSkeleton'
import PropTypes from 'prop-types'
import React from 'react'
import Typography from '@material-ui/core/Typography'

const Acknowledgements = class extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
  render() {
    const { classes } = this.props
    return (
      <PageSkeleton appBar={<MainAppBar title='Acknowledgements'/>}>
        <Typography className={classes.topText}>
          The creators of this app are grateful to the makers of these libraries and their dependent projects - keep open source alive!
        </Typography>

        <List component='nav'>
          {_.map(Package.dependencies, (version, dependency) =>
            <ListItem key={dependency} button component='a' target='_blank' href={`https://www.npmjs.com/${dependency}`}>
              <ListItemText primary={dependency}/>
            </ListItem>
          )}
        </List>

        <Divider/>

        <center>
          <Typography>
            Version: {Package.version}
          </Typography>
        </center>
      </PageSkeleton>
    )
  }
}

const styles = (theme) => ({
  topText: {
    padding: theme.spacing.unit,
  },
})

export default withStyles(styles)(Acknowledgements)
