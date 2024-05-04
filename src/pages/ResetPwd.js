import React, { useState } from "react";
import { Link } from "react-router-dom"
import Button from "../components/Button";
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import logo from "../Assets/img/logo.png";
import lock from "../Assets/img/padlock.png";
import useMediaQuery from '@mui/material/useMediaQuery';
import AngelUser from '../api/angel/user';
import TextField from '@mui/material/TextField';
import {useLocation} from "react-router-dom";
const itemData = [
  {
    img: lock,
    title: 'Breakfast',
  },
]
export default function ResetPassword(props) {
  const matches = useMediaQuery('(max-width:970px)');
  const [callsuccess, setcallsuccess] = useState(false);
  const [password, setPassword] = useState(false);
  const [rePassword, setRePassword] = useState(false);
  const [hasLoginError, setHasLoginError] = useState(false);
  const search = useLocation().search;
  const hash = new URLSearchParams(search).get('hash');
  const resetPassword = async e => {
    e.preventDefault();
    if (password !== rePassword) {
      setHasLoginError(true);
    } else {
      if (hash && !callsuccess) {
        console.log(hash)
        const r = await AngelUser().checkAuth(hash);
        console.log(r);
        if (r && r.data.email) {
          const reset = await AngelUser().resetPwd({ password: password, email: r.data.email })
          if (reset && reset.result ) {
            setcallsuccess(true);
            setHasLoginError(false);
          } else {
            setHasLoginError(true);
            setcallsuccess(false);
          }
        } else {
          setHasLoginError(true);
          setcallsuccess(false);
        }
      }
    }
  }
  const onInputChange = setter => e => {
    setter(e.target.value);
  };
  const isError = () => {
      if(hasLoginError) {
          return (
          <div className="login-form-error">
          Failed to reset a password please set the same password in both fields
        </div>
        )
      }
  }
  const isSuccess = () => {
      if(hasLoginError) {
          return (
            <div className="login-form-success">
            You can now connect to the app with your new password
          </div>
        )
      }
  }
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} style={{ height: matches ? "100%" : "100vh", display: "flex", justifyContent: 'center', alignItems: "center", textAlign: "center" }}>
          <Grid item xs={12} sm={6} style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", height: "100%",
            borderRadius: "20px",
            margin: "20px 0px", display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>

            <Grid xs={12} >
              <ImageList sx={{ width: matches ? "60%" : 500, height: matches ? "auto" : "auto" }} style={{ margin: "auto", marginBottom: "20px", overflow: "hidden" }} cols={1} >
                {itemData.map((item) => (
                  <ImageListItem key={item.img} style={{ width: matches ? "100%" : "350px", margin: 'auto', }}>
                    <img
                      src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                      height="300px"
                      loading="lazy"
                      style={{ height: "100%" }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
              <Typography variant="h4" style={{
                margin: "auto",
                marginBlock: "40px",

              }} component="h4" color="primary">Forgot your password ?
              </Typography>
              <Typography variant="h5" component="h5">Don’t worry ! It happens. Please enter the email <br />adress associated with your account.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div style={{ width: "50%", margin: 'auto', }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="200"
                style={{
                  width: "200px",
                  margin: "auto",
                  marginBottom: "30px"
                }}
                image={logo}
              />
              <Typography variant="h6" style={{
                margin: "auto",
                marginBottom: "20px",
                color: "#5b5a5a"
              }} component="h6">Reset your password
              </Typography>
              <Box sx={{ '& > :not(style)': { mt: 1 } }} style={{ display: "flex", justifyContent: "center", width: "100%", borderRadius: "10px" }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: "100%", borderRadius: "10px" }}>
                  <TextField onFocus={() => setHasLoginError(false)} onChange={onInputChange(setPassword)} InputProps={{ disableUnderline: true }} borderRadius={25} id={"outlined-basic"} type="password" style={{ width: "100%", backgroundColor: "transparent", }} label={<div style={{ display: "flex", borderRadius: "10px", justifyContent: "center", alignItems: "center", border: "unset" }}>
                    <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> Password</div>} variant={"filled"} />
                </Box>
              </Box>
              <Box sx={{ '& > :not(style)': { mt: 1 } }} style={{ display: "flex", justifyContent: "center", width: "100%", borderRadius: "10px" }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: "100%", borderRadius: "10px" }}>
                  <TextField onFocus={() => setHasLoginError(false)} onChange={onInputChange(setRePassword)} InputProps={{ disableUnderline: true }} borderRadius={25} id={"outlined-basic"} type="password" style={{ width: "100%", backgroundColor: "transparent", }} label={<div style={{ display: "flex", borderRadius: "10px", justifyContent: "center", alignItems: "center", border: "unset" }}>
                    <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />re Password</div>} variant={"filled"} />
                </Box>
              </Box>
              <Button text={callsuccess ? "Password updated !" : "Reset my password "} onClick={resetPassword} disabled={callsuccess ? "true" : "false"} />
              {hasLoginError && (
                <div className="login-form-error">
                  Failed to reset a password please set the same password in both fields
                </div>
              )}
              {callsuccess && (
                <div className="login-form-success">
                  You can now connect to the app with your new password
                </div>
              )}
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>

                <Divider style={{ width: "30%", borderColor: "black" }} />
                <Typography style={{ marginInline: "10px" }}>or</Typography>
                <Divider style={{ width: "30%", borderColor: "black" }} />
              </div>
              <Link to="/login">
                <Typography variant="h6" style={{
                  margin: "auto",
                  marginBottom: "40px",
                  color: "#5b5a5a"
                }} component="h5">Go back to <span style={{ fontWeight: "bold" }}>Login</span>  </Typography>
              </Link>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

