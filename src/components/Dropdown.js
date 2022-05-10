import * as React from 'react';
import Box from '@mui/material/Box';

import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Typography } from '@mui/material';

export default function Dropdown({arrofsub ,text,icon}) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const sub = (
      <div>
          {arrofsub?.map((item)=>{
              return       <Typography style={{marginBlock:"8px"}}>{item}</Typography>

          })}
      </div>
  );
  return (
    <Box sx={{ height: checked && arrofsub?"auto":30 }} style={{ marginBlock:"18px",   justifyContent: "unset",flexDirection:"column",alignItems:"center",
    display: "flex",
}}>
      <FormControlLabel
      onClick={handleChange}
        control={
           icon
      }
        label={<span style={{width:"85px",minWidth:"85px",display:"inherit"}}>{text}</span>}
      />
      <Box sx={{ display: 'flex' }}>
        <Fade in={checked}>{sub}</Fade>
      </Box>
    </Box>
  );
}
