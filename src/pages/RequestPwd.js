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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AngelUser from '../api/angel/user';
import TextField from '@mui/material/TextField';
const itemData = [
  {
    img: lock,
    title: 'Breakfast',
  },
]
export default function RequestPassword() {
  const matches = useMediaQuery('(max-width:970px)');
  const [callsuccess, setcallsuccess] = useState(false);
  const [email, setEmail] = useState(false);
  const [ hasLoginError, setHasLoginError ] = useState(false);
  const requestPassword = e => {
    e.preventDefault();
    AngelUser().requestPwd({ email: email }).then(function (r) {
      if (r && r.result === "success") {
        setcallsuccess(true)
      } else {
        setHasLoginError(true);
      }
    });
  }

  const onInputChange = setter => e => {
    setter(e.target.value);
  };
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
              {callsuccess ? <Typography style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center", color: "green"
              }}><CheckCircleOutlineIcon /> <Typography>Check your mails ! An email with a link has been sent to you to reset your password.
                </Typography></Typography> : <Box sx={{ '& > :not(style)': { mt: 1 } }} style={{ display: "flex", justifyContent: "center", width: "100%", borderRadius: "10px" }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: "100%", borderRadius: "10px" }}>
                  <TextField onFocus={() => setHasLoginError(false)} onChange={onInputChange(setEmail)} InputProps={{ disableUnderline: true }} borderRadius={25} id={"outlined-basic"} type="email" style={{ width: "100%", backgroundColor: "transparent", }} label={<div style={{ display: "flex", borderRadius: "10px", justifyContent: "center", alignItems: "center", border: "unset" }}>
                    <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> Email</div>} variant={"filled"} />
                </Box>
              </Box>}
              <Button text={callsuccess ? "Email sent !" : "Request a new password "} onClick={requestPassword} />
              {hasLoginError && (
                  <div className="login-form-error">
                    Failed to Request a password please add a correct email or an existing email
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
              <Link to="/">
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

