import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#030303',
      paper: colors.common.white
    },
    primary: {
      contrastText: '#757575',
      main: '#1A1A1B'
    },
    secondary: {
      main: '#d7dadc'
    },
    text: {
      primary: '#172b4d',
      secondary: '#6b778c',
      ternary: '#fafafa'
    }
  },
  shadows,
  typography
});

export default theme;
