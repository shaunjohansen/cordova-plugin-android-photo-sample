import { withStyles } from '@material-ui/core/styles'
import _ from 'lodash'
import amber from '@material-ui/core/colors/amber'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import classNames from 'classnames'
import CloseIcon from '@material-ui/icons/Close'
import ErrorIcon from '@material-ui/icons/Error'
import EventDispatcher from 'utils/EventDispatcher'
import green from '@material-ui/core/colors/green'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import PropTypes from 'prop-types'
import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import WarningIcon from '@material-ui/icons/Warning'

export const LEVEL_SUCCESS = 'success'
export const LEVEL_INFO = 'info'
export const LEVEL_WARNING = 'warning'
export const LEVEL_ERROR = 'error'

const DEFAULT_TIME_MILLIS = 30 * 1000 // 30 seconds

let _snackbarMessages = []
let _lastSnackbarId = 0

const _snackbarMessageDispatcher = new EventDispatcher()
const UPDATE_EVENT = 'updated'
const dispatchUpdateEvent = () => {
  _snackbarMessageDispatcher.dispatchEvent({ type: UPDATE_EVENT, snackbarMessages: _snackbarMessages })
}

export const showSnackbarMessage = (text, level=LEVEL_ERROR, timeToDisplay=DEFAULT_TIME_MILLIS) => {
  const message = {
    text,
    level,
    id: _lastSnackbarId++,
    icon: levelIcon[level],
  }
  _snackbarMessages.push(message)
  dispatchUpdateEvent()

  setTimeout(() => {
    removeSnackbarMessage(message.id)
  }, timeToDisplay)

  return message.id
}

export const removeSnackbarMessage = (id) => {
  _.remove(_snackbarMessages, { id })
  dispatchUpdateEvent()
}

// clears all snackbar messages
export const clearSnackbarMessages = () => {
  _snackbarMessages = []
  dispatchUpdateEvent()
}

const levelIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

class SnackbarMessages extends React.Component {
  state = {
    snackbarMessages: null,
  }
  componentDidMount() {
    _snackbarMessageDispatcher.addEventListener(UPDATE_EVENT, this.handleSnackbarMessagesUpdate)
  }
  componentWillUnmount() {
    _snackbarMessageDispatcher.removeEventListener(UPDATE_EVENT, this.handleSnackbarMessagesUpdate)
  }
  handleSnackbarMessagesUpdate = (event) => {
    this.setState({ snackbarMessages: event.snackbarMessages })
  }
  render() {
    const { snackbarMessages } = this.state
    if (!snackbarMessages || !snackbarMessages.length) {
      return null
    }
    return (<Snackbar open={true}>
      <div>
        {_snackbarMessages.map((snackbarMessage) => (
          <SnackbarMessage key={snackbarMessage.id} snackbarMessage={snackbarMessage}/>
        ))}
      </div>
    </Snackbar>)
  }
}

const snackbarMessageStyles = (theme) => {
  return {
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
      backgroundColor: theme.palette.primary.dark,
    },
    warning: {
      backgroundColor: amber[700],
    },

    message: {
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing.unit,
    },
    margin: {
      margin: theme.spacing.unit,
    },
  }
}

const SnackbarMessage = withStyles(snackbarMessageStyles)(class extends React.Component {
  static propTypes = {
    snackbarMessage: PropTypes.object.isRequired,
  }
  handleClose = () => {
    removeSnackbarMessage(this.props.snackbarMessage.id)
  }
  render() {
    const { classes, snackbarMessage } = this.props

    const messageId = `message-id-${snackbarMessage.id}`
    const Icon = levelIcon[snackbarMessage.level]

    return <SnackbarContent
      className={classNames(classes[snackbarMessage.level], classes.margin)}
      aria-describedby={messageId}
      message={
        <span id={messageId} className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {snackbarMessage.text}
        </span>
      }
      action={[
        <IconButton
          key='close'
          aria-label='Close'
          color='inherit'
          className={classes.close}
          onClick={this.handleClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
    />
  }
})

export default SnackbarMessages
