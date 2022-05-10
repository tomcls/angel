import React from "react";
import {Link} from "react-router-dom"
import XButton from "../components/Button";
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import logo from "../Assets/img/logo.png";
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function LoginComponent(props) {

  const matches = useMediaQuery('(max-width:970px)');

  const onInputChange = setter => e => {
    setter(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    props.onSubmit(e);
  };

  return (
        <div style={{width:matches?"90%":"50%",margin: 'auto',marginTop:matches?"50px":"0px"}}>
          <CardMedia component="img" alt="green iguana" height="100" style={{    width: "100px", margin: "auto",marginBottom: "50px"}} image={logo} />
          <Typography variant="h5"  style={{margin: "auto", marginBottom: "40px", color:"#5b5a5a"}} component="h5">Welcome to Mynursingangel</Typography>
          <div>
            <Box sx={{ '& > :not(style)': { mt: 1 } }} style={{display: "flex", justifyContent: "center", width:"100%", borderRadius:"10px"}}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' ,width:"100%",borderRadius:"10px"}}>
                <TextField onChange={onInputChange(props.setUsername)} InputProps={{disableUnderline: true}} borderRadius={25} id={"outlined-basic"} style={{width:"100%",backgroundColor:"transparent",}} label={<div style={{display: "flex",borderRadius:"10px",justifyContent: "center",alignItems: "center",border:"unset"}}>
                <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> Email</div>} variant={"filled"} />
              </Box>
            </Box>
            <Box sx={{ '& > :not(style)': { mt: 1 } }} style={{display: "flex", justifyContent: "center", width:"100%", borderRadius:"10px"}}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' ,width:"100%",borderRadius:"10px"}}>
                <TextField type="password" onChange={onInputChange(props.setPassword)} InputProps={{disableUnderline: true}} borderRadius={25} id={"outlined-basic"} style={{width:"100%",backgroundColor:"transparent",}} label={<div style={{display: "flex",borderRadius:"10px",justifyContent: "center",alignItems: "center",border:"unset"}}>
                <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> Password</div>} variant={"filled"} />
              </Box>
            </Box>
          </div> 
          <Link to="/reset-password">
            <Typography style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-end",  color:"#5b5a5a"}}>Forgot Password?</Typography>
          </Link>
        
          <XButton text="Login" onClick={(onSubmit)}/>
          {props.hasLoginError && (
            <div className="login-form-error">
              Login Failed: Incorrect Credentials
            </div>
          )}
          <div style={{    display: "flex", justifyContent: "center", alignItems: "center"}}>
              <Divider style={{width:"30%",borderColor:"black"}} />
              <Typography style={{marginInline:"10px"}}>or</Typography>
              <Divider  style={{width:"30%",borderColor:"black"}}/>
          </div>
          <Typography variant="h6"  style={{margin: "auto",marginBottom: "40px", color:"#5b5a5a" }} component="h5">Not on mynursing angel yet ?         
            <Link to="/register">
              <span style={{fontWeight:"bold"}}>Register</span> 
            </Link> 
          </Typography>
        </div>
    );
}