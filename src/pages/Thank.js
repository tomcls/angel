import React from "react" ;

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
import thankiamge from "../Assets/img/headphone.png";
import useMediaQuery from '@mui/material/useMediaQuery';

const itemData = [
  {
    img: thankiamge,
    title: 'Breakfast',
  },
 
  ]
function Thank() {
  const matches = useMediaQuery('(max-width:970px)');

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} style={{    height: "100vh",display:"flex",justifyContent: 'center',alignItems:"center",textAlign:"center"}}>
        <Grid item xs={12}  sm={6} style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",    height: "100%",
    borderRadius: "20px",
    margin: "20px 0px",display: "flex",
    justifyContent: "center",
    alignItems: "center"}}>
   
        <Grid  xs={12} >
        <ImageList sx={{ width:matches? 300:500, height: 350 }} style={{margin:"auto",marginBottom:"20px",overflow:"hidden"}} cols={1} rowHeight={350}>
      {itemData.map((item) => (
        <ImageListItem key={item.img} style={{width:matches?"auto":"auto"}}>
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
          
      }} component="h4" color="primary">Thank you for registering
      </Typography>
      <Typography variant="h5" component="h5">You are properly registered to My Nursing <br/> Angel but not a member yet...

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
      }} component="h6">Reviewing your profile
      </Typography>
      <Typography variant="h6"  style={{   
          margin: "auto",
          marginBottom: "20px",
          
          color:"#313131",
          fontSize:"16px"
      }} component="h6" className="colorBlack">
      The team is currently reviewing your profile <br/> You will be notified by email when it’s done. <br/> Not fast enough for you ? Contact us.

      </Typography>
          
        
           <Button text="Contact Us "/>
        
      
            </div>
       
        </Grid>
       
       
      </Grid>
    </Box>
     
    </div>
  );
}

export default Thank;
