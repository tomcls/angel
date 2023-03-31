import './App.css';
import React, { useReducer } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { AppContextProvider, appReducer, initialAppState } from './contexts/AppContext';
import Application from './containers/Application';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppStyle from "./templates/style";

import { LocalizationProvider, frFR } from '@mui/x-date-pickers';
//import { frFR as dataGridfrFR } from '@mui/x-data-grid';
import { frFR as coreFR, enUS as coreUS, nlNL as coreNL, deDE as coreDE, trTR as coreTR  } from '@mui/material/locale';
import { fr, nlBE, enUS, de, tr } from 'date-fns/esm/locale'
const locales = ['enUs', 'fr', 'de', 'ru', 'ar-sa'];

function App() {
  const [locale, setLocale] = React.useState(enUS);
  const [coreLocale, setCoreLocale] = React.useState(enUS);
  const [appState, appDispatch] = useReducer(appReducer, initialAppState);
  const appContextValues = {
    appState,
    appDispatch
  }
  React.useEffect(() => {
    console.log('useEfffffect')
    selectLocale(appState.lang);
    selectCoreLocale(appState.lang);
}, []);
const selectCoreLocale = (newLocale) => {
  if (newLocale === 'en') {
    setCoreLocale(coreUS);
  }
  if (newLocale === 'fr') {
    setCoreLocale(coreFR);
  }
  if (newLocale === 'nl') {
    setCoreLocale(coreNL);
  }
  if (newLocale === 'de') {
    setCoreLocale(coreDE);
  }
  if (newLocale === 'tr') {
    setCoreLocale(coreTR);
  }
};
  const selectLocale = (newLocale) => {
    if (newLocale === 'en') {
      setLocale(enUS);
    }
    if (newLocale === 'fr') {
      setLocale(fr);
    }
    if (newLocale === 'nl') {
      setLocale(nlBE);
    }
    if (newLocale === 'de') {
      setLocale(de);
    }
    if (newLocale === 'tr') {
      setLocale(tr);
    }
  };

  const mainTheme = createTheme(AppStyle().main(), locale, locale, coreLocale);
  console.log('lang=', appState.lang);
  return (
    <AppContextProvider value={appContextValues} >
      <ThemeProvider theme={mainTheme}>
        <LocalizationProvider adapterLocale={locale}
          dateAdapter={AdapterDateFns}
        >
          <Application />
        </LocalizationProvider>
      </ThemeProvider>
    </AppContextProvider>
  );
}

export default App;
