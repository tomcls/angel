import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';

import  withStyles  from "@mui/styles/withStyles";


export default function InputWithIcon({text,icon,type}) {
  const CustomTextField = withStyles({ 
    root: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderRadius: type?"25px":"10px", 
          
        },
      },
    },
  })(TextField);
  return (
    <Box sx={{ '& > :not(style)': { mt: 1 } }} style={{display: "flex",
        justifyContent: "center",width:"100%",borderRadius:type?"25px":"10px",}}>
      
    
      <Box sx={{ display: 'flex', alignItems: 'flex-end' ,width:"100%",borderRadius:type?"25px":"10px",}}>
        
        <CustomTextField InputProps={{
    disableUnderline: true, // <== added this
  }} borderRadius={25} id={type ?"outlined-basic":"filled-basic"} style={{width:"100%",backgroundColor:type?"white":"transparent",}} label={<div style={{display: "flex",borderRadius:type?"25px":"10px",
    justifyContent: "center",
    alignItems: "center",border:"unset"}}>{icon} {text}</div>} variant={type ?"outlined":"filled"} />

      </Box>
    </Box>
  );
}
