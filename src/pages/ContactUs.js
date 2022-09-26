import React ,{useState}from "react" ;
import Button from "../components/Button";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import box from "../Assets/img/box.png";
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';



const itemData = [
  {
    img: box,
    title: 'Breakfast',
  },
 
  ]
function Thank() {
  const matches = useMediaQuery('(max-width:970px)');
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} style={{    height: "100vh",display:"flex",justifyContent: 'center',alignItems:"center",textAlign:"center"}}>
      <Grid item xs={12}  sm={7} style={{   
    borderRadius: "20px",
    margin: "10px 0px",display: "flex",
    flexDirection:"column",
    justifyContent: "center",
    alignItems: "center"}}>
<Typography variant="h4"  style={{   
          margin: "auto",
          marginBlock: "20px",
          
      }} component="h4">
Contact us

</Typography>
<Typography variant="h6"  style={{   
          margin: "auto",
          marginBlock: "10px",
          
      }} component="h6">
Still got some questions left with no answer ? Don’t hesitate to reach us through this form with your question(s) and we’ll get back to you as soon as possible.


</Typography>

    </Grid>
        <Grid item xs={12}  sm={6} style={{    
    borderRadius: "20px",
    margin: "20px 0px",display: "flex",
    justifyContent: "center",
    alignItems: "center"}}>
   
        <Grid  xs={12} >
        <ImageList sx={{ width:matches? "100%":500, height:matches?"auto": "auto" }} style={{margin:"auto",marginBottom:"20px",overflow:"hidden"}} cols={1} >
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
   
        </Grid>
       
        </Grid>
     
        <Grid item xs={12}  sm={6}>
          <div style={{width:"100%",margin: 'auto',}}>
    
            <Typography variant="h4"  style={{   
          margin: "auto",
          marginBottom: "20px",
          color:"#5b5a5a"
      }} component="h4">Send us a message !

      
      
      </Typography>
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width:matches?"90%":"25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
       
        <TextField
          id="outlined-password-input"
          label="First Name"
          type="text"
          autoComplete="current-password"
          style={{border:"1px solid #0C7DDF",borderRadius:"8px"}}
          InputLabelProps={{
            style: {
              
              color: '#0C7DDF'
            } }} 
        />
      <TextField
          id="outlined-password-input"
          label="Last Name"
          type="text"
          style={{border:"1px solid #0C7DDF",borderRadius:"8px"}}
          InputLabelProps={{
            style: {
              
              color: '#0C7DDF'
            } }} 
          autoComplete="current-password"
        />
      
      </div>
      <div>
       
       <TextField
         id="outlined-password-input"
         label="Phone Number"
         type="text"
         autoComplete="current-password"
         style={{border:"1px solid #0C7DDF",borderRadius:"8px"}}
          InputLabelProps={{
            style: {
              
              color: '#0C7DDF'
            } }} 
       />
     <TextField
         id="outlined-password-input"
         label="Email Address"
         type="text"
         autoComplete="current-password"
         style={{border:"1px solid #0C7DDF",borderRadius:"8px"}}
          InputLabelProps={{
            style: {
              
              color: '#0C7DDF'
            } }} 
       />
     
     </div>
     <div>
       
     <TextareaAutosize
      aria-label="minimum height"
      minRows={6}
      placeholder="Write your message here...      "
      style={{border:"1px solid #0C7DDF",borderRadius:"8px",width:matches?"90%":"420px"}}
          InputLabelProps={{
            style: {
              
              color: '#0C7DDF'
            } }} 
            color="primary"
    />
     
     </div>
    
      </Box>
     

        <div style={{width:"250px",margin:"auto"}}>
        <Button text="Contact Us"/>

        </div>
        
        
            </div>
       
        </Grid>
       
       
      </Grid>
    </Box>
     
    </div>
  );
}

export default Thank;
