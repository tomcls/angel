import React, { useState } from "react";
import { Link } from 'react-router-dom'

import XButton from '../components/Button';
import Input from '../components/Input';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import logo from '../Assets/img/logo.png';
import firstImage from '../Assets/img/firstImage.png';
import third from '../Assets/img/third.png';
import second from '../Assets/img/second.png';
import useMediaQuery from '@mui/material/useMediaQuery';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ShieldIcon from '@mui/icons-material/Shield';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import flag from '../Assets/img/flag.png'
import MenuList from '@mui/material/MenuList';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import TextField from '@mui/material/TextField';
import AngelUser from "../api/angel/user";
import {useNavigate} from 'react-router-dom';
import TeaserComponent from "../templates/Teaser";
import Header from "../templates/Header";
const itemData = [
  {
    img: firstImage,
    title: 'Breakfast',
  },
  {
    img: second,
    title: 'Burger',
  },
  {
    img: third,
    title: 'Camera',
  },
];
function Register() {
  const matches = useMediaQuery('(max-width:970px)');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState('');
  const [password, setPassword] = useState('');
  const [hasRegisterError, setRegisterError] = useState(null);
  const [openProfile, setopenProfile] = React.useState(false);
  const anchorRef = React.useRef(null);
  
  const prevOpen = React.useRef(openProfile);
  React.useEffect(() => {
    if (prevOpen.current === true && openProfile === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = openProfile;
  }, [openProfile]);

  const handleChange = (event) => {
    console.log("event",event.target.value)
    setProfile(event.target.value);
  };
  const onInputChange = setter => e => {
    setter(e.target.value);
  };
  const navigate = useNavigate();
  const onSubmit = e => {
    e.preventDefault();
    console.log({firstname: firstname, lastname: lastname, type: profile, email: email, password: password});
    AngelUser().register({firstname: firstname, lastname: lastname, type: profile, email: email, password: password, role:'V'}).then(function (result) {
      if ( result && result.saved) {
        navigate('/thank', {replace: true});return;
      } else {
       setRegisterError("Une erreur s'est produite");
      }
    });
  };
  return (
    <div className='App'>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          style={{
            height: matches ? '100%' : '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Header/>
          <TeaserComponent/>
          <Grid item xs={12} sm={6}>
            <div style={{ width: matches ? '90%' : '50%', margin: 'auto' }}>
              <CardMedia
                component='img'
                alt='green iguana'
                height='100'
                style={{ width: '100px', margin: 'auto', marginBottom: '50px' }}
                image={logo}
              />
              <Typography
                variant='h5'
                style={{
                  margin: 'auto',
                  marginBottom: '40px',
                  color: '#5b5a5a',
                }}
                component='h5'
              >
                Welcome to Mynursingangel
              </Typography>
              <div>
                <FormControl fullWidth variant='filled'>
                  <InputLabel style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }} id='demo-simple-select-filled-label'><ShieldIcon style={{ marginRight: '5px', color: 'gray' }} /> <Typography style={{ fontSize: '14px' }}>Register as a doctor, nurse, pharmacy...</Typography> </InputLabel>
                  <Select
                    labelId='demo-simple-select-filled-label'
                    id='demo-simple-select-filled'
                    value={profile}
                    label='Profile'
                    disableUnderline
                    onChange={handleChange}
                  >
                    <MenuItem value={'nurse'}>Nurse</MenuItem>
                    <MenuItem value={'doctor'}> Doctor</MenuItem>
                    <MenuItem value={'coordinator'}>Coordinator</MenuItem>
                    <MenuItem value={'lab'}>Lab</MenuItem>

                  </Select>
                </FormControl>
                <Box sx={{ '& > :not(style)': { mt: 1 } }} style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '10px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%', borderRadius: '10px' }}>
                    <TextField onChange={onInputChange(setFirstname)} InputProps={{ disableUnderline: true }} borderRadius={25} id={'outlined-basic'} style={{ width: '100%', backgroundColor: 'transparent', }} label={<div style={{ display: 'flex', borderRadius: '10px', justifyContent: 'center', alignItems: 'center', border: 'unset' }}>
                      <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> Firstname</div>} variant={'filled'} />
                  </Box>
                </Box>
                <Box sx={{ '& > :not(style)': { mt: 1 } }} style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '10px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%', borderRadius: '10px' }}>
                    <TextField onChange={onInputChange(setLastname)} InputProps={{ disableUnderline: true }} borderRadius={25} id={'outlined-basic'} style={{ width: '100%', backgroundColor: 'transparent', }} label={<div style={{ display: 'flex', borderRadius: '10px', justifyContent: 'center', alignItems: 'center', border: 'unset' }}>
                      <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> Lastname</div>} variant={'filled'} />
                  </Box>
                </Box>
                <Box sx={{ '& > :not(style)': { mt: 1 } }} style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '10px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%', borderRadius: '10px' }}>
                    <TextField onChange={onInputChange(setEmail)} InputProps={{ disableUnderline: true }} borderRadius={25} id={'outlined-basic'} style={{ width: '100%', backgroundColor: 'transparent', }} label={<div style={{ display: 'flex', borderRadius: '10px', justifyContent: 'center', alignItems: 'center', border: 'unset' }}>
                      <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> Email</div>} variant={'filled'} />
                  </Box>
                </Box>
                <Box sx={{ '& > :not(style)': { mt: 1 } }} style={{ display: "flex", justifyContent: "center", width: "100%", borderRadius: "10px" }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', width: "100%", borderRadius: "10px" }}>
                    <TextField type="password" onChange={onInputChange(setPassword)} InputProps={{ disableUnderline: true }} borderRadius={25} id={"outlined-basic"} style={{ width: "100%", backgroundColor: "transparent", }} label={<div style={{ display: "flex", borderRadius: "10px", justifyContent: "center", alignItems: "center", border: "unset" }}>
                      <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> Password</div>} variant={"filled"} />
                  </Box>
                </Box>
              </div>
              <FormControlLabel control={<Checkbox defaultChecked />} style={{ fontSize: '12px' }} label='I agree to the My Nursing angel Terms & conditions' />
              {hasRegisterError && (
                <div className="login-form-error">
                  {hasRegisterError}
                </div>
              )}
              <XButton text="Register" onClick={(onSubmit)}/>
              <Link to='/'>
                <Typography
                  variant='h6'
                  style={{
                    margin: 'auto',
                    marginBottom: '40px',
                    color: '#5b5a5a',
                  }}
                  component='h5'
                >
                  Yoy have an account?{' '}
                  <span style={{ fontWeight: 'bold' }}>Login</span>{' '}
                </Typography>
              </Link>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Register;
