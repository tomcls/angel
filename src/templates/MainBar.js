import React, { useContext } from "react";
import Bar from "./Bar";
import { createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import AppStyle from "./style";
import SubBar from "./SubBar";
import AppContext from '../contexts/AppContext';

export default function MainBar(props) {
    const appContext = useContext(AppContext);
    const [user,] = React.useState(null);
    const [userSession,] = React.useState(appContext.appState.user);
    const navigate = useNavigate();

    const drawerTheme = createTheme({
        ...AppStyle().main(),
        ...AppStyle().drawer(),
    });

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate('/login', { replace: true }); return;
    };
    const renderBar = (user) => {
        if (userSession && (userSession.nurse_id || userSession.doctor_id)) {
            return (<SubBar open={props.open} user={appContext.appState.user} logout={logout} theme={drawerTheme} />)
        } else {
            return (<Bar open={props.open} user={appContext.appState.user} logout={logout} theme={drawerTheme} />)
        }
    }
    return (
        renderBar(user)
    );
}