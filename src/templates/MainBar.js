import React from "react";
import Bar from "./Bar";
import { createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { frFR, enUS, nlNL } from '@mui/material/locale';
import AppStyle from "./style";
import BarNurse from "./BarNurse";

export default function MainBar(props) {
    const [user, setUser] = React.useState(null);
    const navigate = useNavigate();
    const [lang, setLang] = React.useState(enUS);
    const u = JSON.parse(window.appStorage.getItem('user'));
    const t = JSON.parse(window.appStorage.getItem('token'));
    React.useEffect(() => {
        validateCredentials();
    },[]);
    const validateCredentials = () => {
        if (u && u.id && t) {
           setUser(u);
           if(u.lang === 'fr'){
            setLang(frFR)
           } else if(u.lang === 'nl') {
            setLang(nlNL)
           }
        } else {
            navigate('/login', { replace: true }); return;
        }
    }
    const drawerTheme = createTheme({
        ...AppStyle().main(),
        ...AppStyle().drawer(),
        lang
    });
    const logout = () => {
      window.appStorage.removeItem("user");
      window.appStorage.removeItem("token");
      navigate('/login', { replace: true }); return;
    };
    const renderBar = (user) => {
        
        const u = JSON.parse(window.appStorage.getItem('user'));
        if(u && u.nurse_id) {
            return (<BarNurse open={props.open} user={user} logout={logout} theme={drawerTheme} />)
        } else {
            return(<Bar open={props.open} user={user} logout={logout} theme={drawerTheme} />)
        }
    }
    return (
       renderBar(user)
    );
}