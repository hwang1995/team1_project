import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Spoqa Han Sans Neo',
      'Lato',
      'Noto Sans KR',
    ],

    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
