import React ,{useState}from "react" ;
import {Link} from "react-router-dom"

import Button from "../components/Button";
import Input from "../components/Input";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import logo from "../Assets/img/logo.png";
import lock from "../Assets/img/padlock.png";
import useMediaQuery from '@mui/material/useMediaQuery';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const itemData = [
  {
    img: lock,
    title: 'Breakfast',
  },
 
  ]
function Thank() {
  const matches = useMediaQuery('(max-width:970px)');
const [callsuccess, setcallsuccess] = useState(false)
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} style={{    height: matches?"100%":"100vh",display:"flex",justifyContent: 'center',alignItems:"center",textAlign:"center"}}>
        <Grid item xs={12}  sm={6} style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",    height: "100%",
    borderRadius: "20px",
    margin: "20px 0px",display: "flex",
    justifyContent: "center",
    alignItems: "center"}}>
   
        <Grid  xs={12} >
        <ImageList sx={{ width:matches? "60%":500, height:matches?"auto": "auto" }} style={{margin:"auto",marginBottom:"20px",overflow:"hidden"}} cols={1} >
      {itemData.map((item) => (
        <ImageListItem key={item.img} style={{width:matches?"100%":"350px",margin: 'auto',}}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            height="300px"
            loading="lazy"
            style={{height:"100%"}}
          />
        </ImageListItem>
      ))}
    </ImageList>
    <Typography  variant="h4"  style={{   
          margin: "auto",
          marginBlock: "40px",
          
      }} component="h4" color="primary">Forgot your password ?

      </Typography>
      <Typography variant="h5" component="h5">Don’t worry ! It happens. Please enter the email <br/>adress associated with your account.

</Typography>
        </Grid>
       
        </Grid>
     
        <Grid item xs={12}  sm={6}>
          <div style={{width:"50%",margin: 'auto',}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        style={{    width: "200px",
          margin: "auto",
          marginBottom: "30px"
      }}
        image={logo}
      />
            <Typography variant="h6"  style={{   
          margin: "auto",
          marginBottom: "20px",
          color:"#5b5a5a"
      }} component="h6">Reset your password
      
      
      </Typography>
      {callsuccess ? <Typography style={{display: "flex",
    justifyContent: "center",
    alignItems: "center",color:"green"}}><CheckCircleOutlineIcon/> <Typography>Check your mails ! An email with a link has been sent to you to reset your password.
</Typography></Typography> :<Input icon={<PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />} text="Enter Your Email" />}
     

        
           <Button text={callsuccess ? "Email sent !":"Reset my password "}/>
        
           <div style={{    display: "flex",
    justifyContent: "center",
    alignItems: "center"}}>
           <Divider style={{width:"30%",borderColor:"black"}} />
           <Typography style={{marginInline:"10px"}}>or</Typography>
           <Divider  style={{width:"30%",borderColor:"black"}}/>

           </div>
           <Link to="/">

           <Typography variant="h6"  style={{   
          margin: "auto",
          marginBottom: "40px",
          color:"#5b5a5a"
      }} component="h5">Go back to<span style={{fontWeight:"bold"}}>Login</span>  </Typography>
      </Link>
            </div>
       
        </Grid>
       
       
      </Grid>
    </Box>
     
    </div>
  );
}

export default Thank;
