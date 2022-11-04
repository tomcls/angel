import './App.css';
import React, { useReducer} from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { AppContextProvider, appReducer, initialAppState } from './contexts/AppContext';
import Application from './containers/Application';

function App() {
  console.log('App')
  const [appState, appDispatch] = useReducer(appReducer, initialAppState);
  const appContextValues = {
    appState,
    appDispatch
  }
  return (
    <AppContextProvider value={appContextValues} >
      <Application/>
    </AppContextProvider>
  );
}

export default App;
