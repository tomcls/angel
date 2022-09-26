import React from "react";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function Header() {
    const anchorRef = React.useRef(null);
    const [openProfile, setopenProfile] = React.useState(false);
    const handleToggle = () => {
        setopenProfile((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
      setopenProfile(false);
    };
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setopenProfile(false);
      } else if (event.key === 'Escape') {
        setopenProfile(false);
      }
    }
    return (
<Grid item xs={12}  sm={12} style={{display: "flex", justifyContent: "flex-end",margin: "10px",top: 0, position: "absolute",right:0,zIndex:"5555"}}>
    <FormControl variant="standard"  >
      <div>
        <Button ref={anchorRef} id="composition-button" aria-controls={openProfile ? 'composition-menu' : undefined} aria-expanded={openProfile ? 'true' : undefined} aria-haspopup="true" onClick={handleToggle} style={{marginInline:"15px"}}>
              <Typography style={{fontSize:"12px",color:"black",marginInline:"15px"}}>
                Fr
              </Typography>
              <ArrowDropDownIcon style={{color:"black",}}/>

        </Button>
        <Popper
          open={openProfile}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={openProfile}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>Fr</MenuItem>
                    <MenuItem onClick={handleClose}>En</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </FormControl>
</Grid>);
}