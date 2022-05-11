import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import LoginComponent from '../containers/Login';
import AngelUser from '../api/angel/user';
import TeaserComponent from '../templates/Teaser';
import Header from '../templates/Header';

export default function Login() {
  const navigate = useNavigate();
  const [ hasLoginError, setHasLoginError ] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const matches = useMediaQuery('(max-width:970px)');
  const [openProfile, setopenProfile] = React.useState(false);
  const anchorRef = React.useRef(null);
  const prevOpen = React.useRef(openProfile);

  React.useEffect(() => {
    if (prevOpen.current === true && openProfile === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = openProfile;
  }, [openProfile]);

  const onSubmit = e => {
    e.preventDefault();
    AngelUser().login({ email: username, password: password }).then(function (result) {
      if (result && result.user) {
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', JSON.stringify(result.accessToken));
        navigate('/dashboard', {replace: true});return;
      } else {
        setHasLoginError(true);
      }
    });
  };
  return (
    <div className='App'>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} style={{ height: matches ? '100%' : '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <Header />
          <TeaserComponent />
          <Grid item xs={12} sm={6}>
            <LoginComponent onSubmit={onSubmit} setUsername={setUsername} setPassword={setPassword} hasLoginError={hasLoginError} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

