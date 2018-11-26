import { LEVEL_INFO, showSnackbarMessage } from 'components/SnackbarMessages'
import { withStyles } from '@material-ui/core/styles'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import getErrorMessage from 'utils/getErrorMessage'
import isAndroid from 'utils/isAndroid'
import isCordova from 'utils/isCordova'
import PropTypes from 'prop-types'
import React from 'react'

const TakePictureButton = class extends React.Component {
  static propTypes = {
    onPictureTaken: PropTypes.func.isRequired,
  }
  state = {
    hasInput: false,
    isDrawerOpen: false,
  }
  constructor() {
    super()
    this.inputRef = React.createRef()
  }
  componentDidMount() {
    if (isCordova() && isAndroid()) {
      window.document.addEventListener('resume', this.handleCordovaResume)
    }
  }
  componentWillUnmount() {
    if (isCordova() && isAndroid()) {
      window.document.removeEventListener('resume', this.handleCordovaResume)
    }
  }
  takePhoto = () => {
    if (isCordova() && isAndroid()) {
      // Android is special-cased here because the user experience with the `<input>` element does
      // not allow the user to take a photo with the camera, therefore we manually give the user the
      // choice between camera (using the cordova-plugin-android-photo) or photo library (using the
      // `<input>` element).
      this.setState({ isDrawerOpen: true })
    } else {
      this.fetchPhotoWithInputElement()
    }
  }
  fetchPhotoFromCameraWithCordova = () => {
    this.closeDrawer()

    navigator.photo.takePicture(this.handleImageFromCordova, (error) => {
      console.error('navigator.photo.takePicture error:', error)
    })
  }
  handleCordovaResume = (event) => {
    if (event && event.action === 'resume' && event.pendingResult && event.pendingResult.pluginServiceName === 'Photo') {
      if (event.pendingResult.pluginStatus === 'OK') {
        this.handleImageFromCordova(event.pendingResult.result)
      } else {
        console.log('Resume event from cordova-plugin-android-photo:', event)
        showSnackbarMessage('No photo selected', LEVEL_INFO)
      }
    } else {
      console.log('Unrelated cordova resume event:', event)
    }
  }
  handleImageFromCordova = (imageFileUri) => {
    window.resolveLocalFileSystemURL(imageFileUri, (fileEntry) => {
      fileEntry.file((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          fetch(reader.result)
            .then(res => res.blob())
            .then(blob => {
              // add attributes to Blob to make it look like a File to caller
              blob.lastModified = file.lastModified
              blob.name = file.name

              this.props.onPictureTaken(blob)
            })
            .catch((error) => {
              console.error('fetch(reader.result)', error)
              showSnackbarMessage(`Error reading photo: ${getErrorMessage(error)}`)
            })
        }
        reader.readAsDataURL(file)
      })
    }, (error) => {
      console.error('window.resolveLocalFileSystemURL', imageFileUri, error)
      showSnackbarMessage(`Error resolving photo: ${getErrorMessage(error)}`)
    })
  }
  fetchPhotoWithInputElement = () => {
    this.inputRef.current && this.inputRef.current.click()
    this.closeDrawer()
  }
  handleInputChange = (event) => {
    this.props.onPictureTaken(event.target.files[0])

    // dismiss the input to reset the FileList, allowing a change event to occur when
    // selecting the same file consecutively
    this.setState({ hasInput: false })
  }
  closeDrawer = () => {
    this.setState({ isDrawerOpen: false })
  }
  render() {
    const { classes } = this.props
    const { hasInput, isDrawerOpen } = this.state

    if (!hasInput) {
      // asynchronously re-add the input field on next tick
      setTimeout(() => {
        this.setState({ hasInput: true })
      }, 0)
    }

    return (
      <React.Fragment>
        <Button
          variant='extendedFab'
          aria-label='Take Photo'
          className={classes.button}
          onClick={this.takePhoto}
        >
          <AddAPhotoIcon className={classes.buttonIcon} />
          Take Photo
        </Button>

        {hasInput && <input
          ref={this.inputRef}
          style={{display: 'none'}}
          accept='image/*'
          type='file'
          onChange={this.handleInputChange}
        />}

        <Drawer
          anchor='bottom'
          open={isDrawerOpen}
          onClose={this.closeDrawer}
        >
          <Button className={classes.drawerButton} onClick={this.fetchPhotoFromCameraWithCordova}>
            Take Photo
          </Button>
          <Button className={classes.drawerButton} onClick={this.fetchPhotoWithInputElement}>
            Photo Library
          </Button>
          <Divider/>
          <Button className={classes.drawerButton} onClick={this.closeDrawer}>
            Cancel
          </Button>
        </Drawer>
      </React.Fragment>
    )
  }
}

const styles = (theme) => ({
  buttonIcon: {
    marginRight: theme.spacing.unit,
  },
})

export default withStyles(styles)(TakePictureButton)
