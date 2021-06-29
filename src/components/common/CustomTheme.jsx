import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Spoqa Han Sans Neo',
      'Lato',
      'Noto Sans KR',
      '-apple-system',
      'BlinkMacSystemFont',
    ],

    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
