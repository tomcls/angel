import { createContext } from 'react';

const u = localStorage.getItem('user');
const t = localStorage.getItem('token');
export const initialAppState = {
    user: u ? JSON.parse(u) : {},
    filters: {},
    token: t ? JSON.parse(t): null,
    lang: u ? JSON.parse(u).lang:'en'
};
export const appReducer = (state, action) => {

    switch (action.type) {
        case 'loadToken':
            let token = action.payload;
            return { ...state, token };
        case 'loadUser':
            let user = action.payload;
            return { ...state, user };
        case 'setFilters':
            let filters = action.payload;
            return { ...state, filters };
        case 'setLang':
            let lang = action.payload;
            return { ...state, lang };
        default:
            return state;
    }
};
const AppContext = createContext({
    appState: initialAppState,
    appDispatch: () => { console.log('AppContext.appDispatch') }
});
export const AppContextConsumer = AppContext.Consumer;
export const AppContextProvider = AppContext.Provider;
export default AppContext;