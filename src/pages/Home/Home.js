import { showSnackbarMessage } from 'components/SnackbarMessages'
import { withStyles } from '@material-ui/core/styles'
import _ from 'lodash'
import getErrorMessage from 'utils/getErrorMessage'
import loadImage from 'blueimp-load-image'
import MainAppBar from 'app/MainAppBar'
import PageSkeleton from 'components/PageSkeleton'
import React from 'react'
import TakePictureButton from './TakePictureButton'
import Typography from '@material-ui/core/Typography'

const Home = class extends React.Component {
  state = {
    isProcessing: false,
    src: null,
    file: null,
    meta: null,
  }
  handlePictureTaken = (file) => {
    console.log('handlePictureTaken', file)

    const fileProps = {}
    _.forIn(file, (value, key) => {
      fileProps[key] = value
    })

    this.setState({ isProcessing: true, src: null, file: fileProps, meta: null })

    loadImage(file, (canvas, meta) => {
      if (canvas.type === 'error') {
        const error = canvas
        showSnackbarMessage(`loadImage error: ${getErrorMessage(error)}`)
        this.setState({ isProcessing: false })
        return
      }

      this.setState({ meta })

      canvas.toBlob((blob) => {
        if (!blob) {
          showSnackbarMessage('Unable to create image blob')
          this.setState({ isProcessing: false })
          return
        }
        const objectUrl = URL.createObjectURL(blob)

        // clean up old blob
        URL.revokeObjectURL(this.state.src)

        this.setState({ src: objectUrl, isProcessing: false })
      })
    }, {
      canvas: true,
      orientation: true,
    })
  }
  render() {
    const { classes } = this.props
    const { isProcessing, src, file, meta } = this.state

    return (
      <PageSkeleton appBar={<MainAppBar title='Take a Picture'/>} showProgress={isProcessing}>
        <div className={classes.topText}>
          <Typography className={classes.text}>
            The button below will do different things depending on which platform this was built for.
          </Typography>
          <Typography className={classes.text}>
            On Android, it will pop up a Drawer prompting whether to use the cordova-plugin-android-photo's
            behaviour or using the native &lt;input&gt; element.
          </Typography>
          <Typography className={classes.text}>
            On web and iOS, the native &lt;input&gt; element provides the correct behaviour.
          </Typography>
          <Typography className={classes.text}>
            Regardless of platform we must apply orientation corrections for photos. It is best to do this
            uniformly across platforms because you can never be sure how an image was generated. For example,
            someone on an iOS device may choose a file that was generated with an Android device with
            orientation metadata.
          </Typography>
        </div>
        <center>
          <TakePictureButton onPictureTaken={this.handlePictureTaken}/>
        </center>
        {src &&
          <center>
            <img alt='selected' className={classes.img} src={src}/>
          </center>
        }
        <div className={classes.summary}>
          {file && <React.Fragment>
            <Typography variant='title'>File Properties</Typography>
            <pre>{JSON.stringify(file, null, 2)}</pre>
          </React.Fragment>}
          {meta && <React.Fragment>
            <Typography variant='title'>EXIF Metadata</Typography>
            <pre>{JSON.stringify(meta, null, 2)}</pre>
          </React.Fragment>}
        </div>
      </PageSkeleton>
    )
  }
}

const styles = (theme) => ({
  topText: {
    padding: theme.spacing.unit,
  },
  text: {
    paddingBottom: theme.spacing.unit,
  },
  img: {
    paddingTop: 2 * theme.spacing.unit,
    maxWidth: '95%',
  },
  summary: {
    padding: theme.spacing.unit,
  },
})

export default withStyles(styles)(Home)
