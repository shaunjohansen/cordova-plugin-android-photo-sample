import { createMuiTheme } from '@material-ui/core/styles'

const AppTheme = createMuiTheme({
})

export const InvertedTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

export default AppTheme
