import React, { useReducer, createContext, useContext } from 'react';
import AngelNotifications from '../api/angel/notifications';
// objet d'état initial
const initialState = {
    user: localStorage['user'] ? JSON.parse(localStorage['user']) : '',
    filters: localStorage['filters'] ? JSON.parse(localStorage['filters']) : '',
};
// création du store avec l'état initiale
const StoreContext = createContext(initialState);
// fonction permettant de reconnaitre la fonction à lancer
function reducerActions(session, action) {
    console.log("reducerActions")
    switch (action.type) {
        case 'user'://case 'textType':
            // façon propre (fonction détaché)
            return userFunc(session, action);
        case 'filters'://case 'textType':
            // façon propre (fonction détaché)
            return filterFunc(session, action);
        case 'notifications'://case 'textType':
            // façon propre (fonction détaché)
            return notificationFunc(session, action);
        default:
            console.log('helaola');
    }
}
// fonction permettant un stockage de données en local
// + Modification du state grâce au reducer
const userFunc = (session, action) => {
    console.log("userFunc")
    localStorage['user'] = action.payload;
    return { ...session, user: action.payload };
};
// fonction permettant un stockage de données en local
// + Modification du state grâce au reducer
const filterFunc = (session, action) => {
    console.log("filterFunc")
    localStorage['filters'] = action.payload;
    return { ...session, filters: action.payload };
};
const notificationFunc = async (session, action) => {
    console.log("filterFunc")
   // localStorage['notifications'] = action.payload;
    return { ...session, notifications: action.payload };
};
const isObject = function (a) {
    return (!!a) && (a.constructor === Object);
};
// Fournisseur de données de l'app
export const StoreProvider = ({ children }) => {
    // zone encore un peu sombre
    const [session, dispatch] = useReducer(reducerActions, initialState);
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
    if (session && session.user) {
        if (!isObject(session.user)) {
            session.user = JSON.parse(session.user);
        }
    }
    if (session && session.filters) {
        if (!isObject(session.filters)) {
            session.filters = JSON.parse(session.filters);
        }
    }
    console.log("useStore", session )
    return { session, dispatch };
};
