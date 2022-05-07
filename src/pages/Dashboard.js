import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Input from "../components/Input";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Table from "../components/Table"
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
import PeopleIcon from '@mui/icons-material/People';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

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
  backgroundColor:"white",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  width:"100%"
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [checked, setChecked] = React.useState(false);
  const [age, setAge] = React.useState('');
  const [openProfile, setopenProfile] = React.useState(false);
  const anchorRef = React.useRef(null);

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
  const prevOpen = React.useRef(openProfile);
  React.useEffect(() => {
    if (prevOpen.current === true && openProfile === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = openProfile;
  }, [openProfile]);



  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}   style={{ backgroundColor: "white",boxShadow:"unset" ,display:"flex",flexDirection:"row",justifyContent:"space-between"}}
>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
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
          style={{marginInline:"15px"}}
        >
                  <Avatar   sx={{ width: 40, height: 40 }}
 alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
<Typography style={{fontSize:"16px",color:"black",marginInline:"15px"}}>

Zilfi Balci

<br/>
<Typography style={{fontSize:"12px",color:"gray"}}>
Coordinator
</Typography>
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
                    <MenuItem onClick={handleClose}> <SettingsIcon style={{marginInline:"10px"}} /> Settings</MenuItem>
                    <MenuItem onClick={handleClose}> <LogoutIcon style={{marginInline:"10px"}} /> Log out</MenuItem>
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
            borderRight:"unset",
            borderTop:"unset"
          },
        }}
        variant="persistent"
        anchor="left"
        style={{borderRight:"unset"}}
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
          <Typography variant="h5" noWrap color="primary" component="div">
          My Nursing Angel

          </Typography>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <List>
        
        <Dropdown text="Dashboard"  icon={<GridViewIcon color="primary" style={{marginInline:"15px"}}/>}/>
        <Dropdown text="Sruvey" arrofsub={["Patients","Care giver"]} icon={<GridViewIcon color="primary" style={{marginInline:"15px"}}/>}/>
        <Dropdown text="Patient" icon={<PersonIcon color="primary" style={{marginInline:"10px"}}/>}/>
        <Dropdown text="Medication" icon={<BeachAccessIcon color="primary" style={{marginInline:"10px"}}/>}/>
        <Dropdown text="Coordinators" icon={<DeviceThermostatIcon color="primary" style={{marginInline:"10px"}}/>}/>
        <Dropdown text="Datas" arrofsub={["Patient","moods","side effects"]} icon={<TrendingUpIcon color="primary" style={{marginInline:"10px"}}/>}/>
        <Dropdown text="Settings" icon={<SettingsIcon color="primary" style={{marginInline:"10px"}}/>}/>

        </List>
        
     
      </Drawer>
      <Main open={open} style={{background: "rgb(229 229 229 / 41%)",marginBlock:"64px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{marginBlock:"20px",width:"70%"}}>
          <Input
                  icon={
                    <SearchIcon
                      sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                  }
                  type="Outlined"
                  text=" Search"
                />

          </div>
          <Button variant="outlined" style={{color:"black"}}>
              <PeopleIcon style={{marginInline:"3px"}}/> Add patient</Button>
          </div>
       

     
<Table/>  
      </Main>
    </Box>
  );
}
