import React from "react";
import { styled, useTheme } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GridViewIcon from '@mui/icons-material/GridView';
import Dropdown from "../components/Dropdown"
import PersonIcon from '@mui/icons-material/Person';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: "white",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  width: "100%"
}));

export default function Bar(props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [openProfile, setopenProfile] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [user, setUser] = React.useState(null);

  const handleToggle = () => {
    setopenProfile((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setopenProfile(false);
  };
  const logout = (event) => {
    window.appStorage.removeItem("user");
    window.appStorage.removeItem("token");
    navigate('/login', {replace: true});return;
  };
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setopenProfile(false);
    } else if (event.key === 'Escape') {
      setopenProfile(false);
    }
  }
  const prevOpen = React.useRef(openProfile);
  React.useEffect(() => {
    console.log('useEffect Bar')
    const u = validateCredentials();
    if(u) {
      setUser(u);
    }
    if (prevOpen.current === true && openProfile === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = openProfile;
  }, [openProfile]);

  const handleDrawerOpen = () => {
    setOpen(true);
    props.open(true)
  };

  const handleDrawerClose = () => {
    setOpen(false);
    props.open(false)
  };

  const validateCredentials = () => {
    const u = JSON.parse(window.appStorage.getItem('user'));
    const t = JSON.parse(window.appStorage.getItem('token'));
    if( u && u.id && t) {
      return u;
    }
    navigate('/login', {replace: true});return;
  }

  return (<>
        <CssBaseline />
        <AppBar position="fixed" open={open} style={{ backgroundColor: "white", boxShadow: "unset", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}>
              <MenuIcon />
            </IconButton>

          </Toolbar>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <div>
              <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={openProfile ? 'composition-menu' : undefined}
                aria-expanded={openProfile ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                style={{ marginInline: "15px" }}>
                <Avatar sx={{ width: 40, height: 40 }}
                  alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkp0LF2WgeDkn_sQ1VuMnlnVGjkDvCN4jo2nLMt3b84ry328rg46eohB_JT3WTqOGJovY&usqp=CAU" />
                <Typography style={{ fontSize: "16px", color: "black", marginInline: "15px" }}>

                {user && user.id ?user.firstname:''} {user && user.id ?user.lastname:''}

                  <br />
                  <Typography style={{ fontSize: "12px", color: "gray" }}>
                  {user && user.id ?user.type:''}
                  </Typography>
                </Typography>
                <ArrowDropDownIcon style={{ color: "black", }} />
              </Button>
              <Popper
                open={openProfile}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}>
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={openProfile}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}>
                          <MenuItem onClick={handleClose}> <SettingsIcon style={{ marginInline: "10px" }} /> Settings</MenuItem>
                          <MenuItem onClick={logout}> <LogoutIcon style={{ marginInline: "10px" }} /> Log out</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </FormControl>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              borderRight: "unset",
              borderTop: "unset"
            },
          }}
          variant="persistent"
          anchor="left"
          style={{ borderRight: "unset" }}
          open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <Typography variant="h5" noWrap color="primary" component="div">
                My Nursing Angel
              </Typography>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <List>
            <Dropdown key="Dashboard" text="Dashboard" icon={<GridViewIcon color="primary" style={{ marginInline: "15px" }} />} />
            <Dropdown key="Survey" text="Survey" arrofsub={["Patients", "Care giver"]} icon={<GridViewIcon color="primary" style={{ marginInline: "15px" }} />} />
            <Dropdown key="Patient" text="Patient" icon={<PersonIcon color="primary" style={{ marginInline: "10px" }} />} />
            <Dropdown key="Medication" text="Medication" icon={<BeachAccessIcon color="primary" style={{ marginInline: "10px" }} />} />
            <Dropdown key="Coordinators" text="Coordinators" icon={<DeviceThermostatIcon color="primary" style={{ marginInline: "10px" }} />} />
            <Dropdown key="Datas" text="Datas" arrofsub={["Patient", "moods", "side effects"]} icon={<TrendingUpIcon color="primary" style={{ marginInline: "10px" }} />} />
            <Dropdown key="Settings" text="Settings" icon={<SettingsIcon color="primary" style={{ marginInline: "10px" }} />} />
          </List>
        </Drawer>
        </>
  );
}
