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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/lab';
const u = JSON.parse(window.appStorage.getItem('user'));
let lang = enUS
if(u && u.lang === 'fr'){
  lang = frFR;
} else if(u && u.lang === 'nl'){
  lang = nlNL;
}
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
  lang,
);
const mainTheme = createTheme(AppStyle().main());
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LocalizationProvider dateAdapter={AdapterDateFns}>
  <BrowserRouter>
    <ThemeProvider theme={mainTheme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
  </LocalizationProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
