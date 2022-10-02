import React, { useReducer, createContext, useContext } from 'react';
// objet d'état initial
const initialState = {
    user: localStorage['user'] ? JSON.parse(localStorage['user']) : '',
    filters: localStorage['filters'] ? JSON.parse(localStorage['filters']) : '',
};
console.log('initialState', initialState)
// création du store avec l'état initiale
const StoreContext = createContext(initialState);
// fonction permettant de reconnaitre la fonction à lancer
function reducerActions(session, action) {
    console.log('session ', session);
    console.log('action ', action.type);
    switch (action.type) {
        case 'user'://case 'textType':
            // façon propre (fonction détaché)
            return userFunc(session, action);
        case 'filters'://case 'textType':
            // façon propre (fonction détaché)
            return filterFunc(session, action);
        default:
            console.log('helaola');
    }
}
// fonction permettant un stockage de données en local
// + Modification du state grâce au reducer
const userFunc = (session, action) => {
    localStorage['user'] = action.payload;
    console.log('userFunc', localStorage['user'])
    return { ...session, user: action.payload };
};
// fonction permettant un stockage de données en local
// + Modification du state grâce au reducer
const filterFunc = (session, action) => {
    localStorage['filters'] = action.payload;
    console.log('filters', localStorage['filters'])
    return { ...session, filters: action.payload };
};
const isObject = function(a) {
    return (!!a) && (a.constructor === Object);
};
// Fournisseur de données de l'app
export const StoreProvider = ({ children }) => {
    // zone encore un peu sombre
    const [session, dispatch] = useReducer(reducerActions, initialState);
    console.log('StoreProvider', session)
    return (
        <StoreContext.Provider value={{ session, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};
// Utiliser les données
export const useStore = () => {
    // zone encore un peu sombre
    const { session, dispatch } = useContext(StoreContext);
    console.log('useStore', session)
    if(session && session.user) {
      if(!isObject(session.user)) {
        session.user = JSON.parse(session.user);
      }
    }
    if(session && session.filters) {
        if(!isObject(session.filters)) {
          session.filters = JSON.parse(session.filters);
        }
      }
    return { session, dispatch };
};
