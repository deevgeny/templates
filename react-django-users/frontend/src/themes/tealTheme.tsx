import { createTheme, colors } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      // light: colors.teal[300],
      main: colors.teal[500],
      // dark: colors.teal[700],
    },
    secondary: {
      main: colors.teal['A400'],
    },
    error: {
      // light: colors.pink[300],
      main: colors.pink[500],
      // dark: colors.pink[700]
    }
  }
});

export default theme;