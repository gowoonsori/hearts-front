import { createMuiTheme } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#030303',
      paper: '#030303',
    },
    primary: {
      contrastText: '#757575',
      main: '#1A1A1B',
      second: '#272729',
    },
    secondary: {
      main: '#d7dadc',
      contrastText: '#030303',
    },
    ternary: {
      main: '#272729',
      contrastText: '#757575',
    },
    text: {
      primary: '#d7dadc',
      secondary: '#d7dadc',
      ternary: '#d7dadc',
    },
  },
  shadows,
  typography,
});

export default theme;
