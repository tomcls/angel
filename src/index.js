import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import './utils/localStorage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { frFR, enUS, nlNL } from '@mui/material/locale';
import AppStyle from "./templates/style";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
const theme = createTheme(
  {
    components: {
      MuiSvgIcon: {
        styleOverrides: {
          root: ({ theme }) => ({ // using with theme
            color: theme.palette.drawerIcon.main,
          }),
        },
      },
    }
  },
  enUS,
);
const mainTheme = createTheme(AppStyle().main());
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
  <BrowserRouter>
    <ThemeProvider theme={mainTheme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
  </MuiPickersUtilsProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
