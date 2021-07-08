import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import store from './redux/store';
import muiTheme from './components/common/CustomTheme';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto';
import { Fade } from '@material-ui/core';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'moment/locale/ko';
import axios from 'axios';

moment.locale('ko');

ReactDOM.render(
  <BrowserRouter>
    <StylesProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <Provider store={store}>
          <SnackbarProvider
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            TransitionComponent={Fade}
          >
            <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
              <App />
            </MuiPickersUtilsProvider>
          </SnackbarProvider>
        </Provider>
      </ThemeProvider>
    </StylesProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
