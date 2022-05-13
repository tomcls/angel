import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import  withStyles  from "@mui/styles/withStyles";
import { Typography } from '@mui/material';

export default function InputWithIcon({text,icon,type,onChange}) {
  const [field, setField] = useState("");

  function onFieldChange(e) {
    console.log('field change')
    //setField(e.target.value)
    onChange(e.target.value)
  }
  const CustomTextField = withStyles({ 
    root: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderRadius: type?"25px":"10px"
          
        },
      },
    },
  })(TextField);
  return (
    <Box sx={{ '& > :not(style)': { mt: 1 } }} style={{display: "flex", justifyContent: "center", width:"100%", borderRadius:type?"25px":"10px"}}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' ,width:"100%",borderRadius:type?"25px":"10px",}}>
        <CustomTextField onChange={onFieldChange} InputProps={{disableUnderline: true}} borderRadius={25} id={type ?"outlined-basic":"filled-basic"} style={{width:"100%",backgroundColor:type?"white":"transparent",}} label={<div style={{display: "flex",borderRadius:type?"25px":"10px",justifyContent: "center",alignItems: "flex-end",border:"unset"}}>{icon} <Typography style={{lineHeight:"1.3"}}>{text}</Typography></div>} variant={type ?"outlined":"filled"} />
      </Box>
    </Box>
  );
}
