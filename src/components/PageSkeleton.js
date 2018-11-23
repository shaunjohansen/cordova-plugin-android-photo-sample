import { withStyles } from '@material-ui/core/styles'
import Layout from 'utils/Layout'
import LinearProgress from '@material-ui/core/LinearProgress'
import PropTypes from 'prop-types'
import React from 'react'

const PageSkeleton = class extends React.Component {
  static propTypes = {
    appBar: PropTypes.node,
    children: PropTypes.any,
    showProgress: PropTypes.bool,
  }
  static defaultProps = {
    showProgress: false,
  }
  render() {
    const { classes, appBar, showProgress, children } = this.props

    return (
      <div className={classes.outerRow}>
        <div className={classes.outerCol}>
          {appBar}
          {showProgress && <LinearProgress color='secondary'/>}
          <div className={classes.content}>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

const styles = (/*theme*/) => ({
  outerRow: {
    ...Layout.absoluteFill,
    ...Layout.row,
  },
  outerCol: {
    ...Layout.column,
    flex: 1,
    overflowX: 'hidden',
    overflowY: 'hidden',
  },
  content: {
    ...Layout.column,
    flex: 1,
    position: 'relative',
    overflowY: 'auto',
  },
})

export default withStyles(styles)(PageSkeleton)
