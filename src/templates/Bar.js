import React from "react";
import { styled, useTheme, createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { frFR, enUS, nlNL } from '@mui/material/locale';
import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import MoodIcon from '@mui/icons-material/Mood';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HealingIcon from '@mui/icons-material/Healing';
import BiotechIcon from '@mui/icons-material/Biotech';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HailIcon from '@mui/icons-material/Hail';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
import SickIcon from '@mui/icons-material/Sick';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import LogoutIcon from '@mui/icons-material/Logout';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ListSubheader from '@mui/material/ListSubheader';
import AppStyle from "./style";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ScienceIcon from '@mui/icons-material/Science';

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
const drawerTheme = createTheme({
  ...AppStyle().main(),
  ...AppStyle().drawer(),
  enUS
});
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: "white",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  width: "100%"
}));

const defaultAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkp0LF2WgeDkn_sQ1VuMnlnVGjkDvCN4jo2nLMt3b84ry328rg46eohB_JT3WTqOGJovY&usqp=CAU';//process.env.SENDGRID_APIKEY

export default function Bar(props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [openProfile, setopenProfile] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [user, setUser] = React.useState(null);

  const [openUserDown, setOpenUserDown] = React.useState(true);
  const [openTreatmentDown, setOpenTreatmentDown] = React.useState(true);
  const [openEffectDown, setOpenEffectDown] = React.useState(true);
  const [openFactoriesDown, setOpenFactoriesDown] = React.useState(false);
  React.useEffect(() => {

    const u = validateCredentials();
    if (u) {
      setUser(u);
    }
    console.log('useEffect Bar', u, props)
    if (prevOpen.current === true && openProfile === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = openProfile;
  }, [openProfile]);

  const handleToggle = () => {
    setopenProfile((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setopenProfile(false);
  };
  const logout = () => {
    window.appStorage.removeItem("user");
    window.appStorage.removeItem("token");
    navigate('/login', { replace: true }); return;
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
    if (u && u.id && t) {
      return u;
    }
    navigate('/login', { replace: true }); return;
  }
  const handleUserClick = () => {
    console.log(openUserDown)
    setOpenUserDown(!openUserDown);
  };
  const handleTreatmentClick = () => {
    console.log(openTreatmentDown)
    setOpenTreatmentDown(!openTreatmentDown);
  };
  const handleEffectClick = () => {
    console.log(openEffectDown)
    setOpenEffectDown(!openEffectDown);
  };
  const handleFactoriesClick = () => {
    console.log(openFactoriesDown)
    setOpenFactoriesDown(!openFactoriesDown);
  };
  return (<ThemeProvider theme={drawerTheme}>
    <CssBaseline />
    <AppBar position="fixed" open={open} style={{ color: "white", backgroundColor: "#24292e", boxShadow: "unset", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
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
              src={user && user.avatar ? process.env.REACT_APP_API_URL + '/public/uploads/' + user.avatar : defaultAvatar} />
            <Typography style={{ fontSize: "16px", color: "white", marginInline: "15px" }} component={'span'}>

              {user && user.id ? user.firstname : ''} {user && user.id ? user.lastname : ''}

              <br />
              <Typography style={{ fontSize: "12px", color: "lightgray" }}>
                {user && user.id ? user.type : ''}
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
                      <MenuItem component={NavLink} exact="true" to="/settings"> <SettingsIcon style={{ marginInline: "10px" }} /> Settings</MenuItem>
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
          borderTop: "unset",
          color: 'rgb(209, 213, 219)',
          backgroundColor: 'rgb(17, 24, 39)'
        },
      }}
      variant="persistent"
      anchor="left"
      style={{ borderRight: "unset" }}
      open={open}>
      <DrawerHeader sx={{ backgroundColor: 'rgb(17, 24, 39)' }}>
        <IconButton onClick={handleDrawerClose}>
          <Typography variant="h5" noWrap color={'white'} component="div" >
            My Nursing Angel
          </Typography>
          {theme.direction === 'ltr' ? <ChevronLeftIcon color={'drawerIconDark'} /> : <ChevronRightIcon color={'drawerIconDark'} />}
        </IconButton>
      </DrawerHeader>
      <List sx={{ width: '100%', maxWidth: 360 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >

        <ListItemButton component={NavLink} exact="true" to="/dashboard"   >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItemButton>


        <ListItemButton component={NavLink} exact="true" to="/notifications">
          <ListItemIcon>
            <NotificationsNoneIcon />
          </ListItemIcon>
          <ListItemText primary={"Notifications"} />
        </ListItemButton>


        <ListItemButton onClick={handleUserClick}>
          <ListItemText primary={"All users"} />
          {openUserDown ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openUserDown} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 3 }} component={NavLink} exact="true" to="/coordinators">
              <ListItemIcon>
                <SupervisorAccountIcon />
              </ListItemIcon>
              <ListItemText primary="Administrators" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 3 }} component={NavLink} exact="true" to="/patients">
              <ListItemIcon>
                <FamilyRestroomIcon />
              </ListItemIcon>
              <ListItemText primary="Patients" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 3 }} component={NavLink} exact="true" to="/doctors">
              <ListItemIcon>
                <HailIcon />
              </ListItemIcon>
              <ListItemText primary={"Doctors"} />
            </ListItemButton>
            <ListItemButton sx={{ pl: 3 }} component={NavLink} exact="true" to="/nurses">
              <ListItemIcon>
                <EmojiPeopleIcon />
              </ListItemIcon>
              <ListItemText primary={"Nurses"} />
            </ListItemButton>
            <ListItemButton sx={{ pl: 3 }} component={NavLink} exact="true" to="/scientists">
              <ListItemIcon>
                <ScienceIcon />
              </ListItemIcon>
              <ListItemText primary={"Scientists"} />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={handleTreatmentClick}>
          <ListItemText primary={"Treatments"} />
          {openTreatmentDown ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openTreatmentDown} timeout="auto" unmountOnExit>
          <ListItemButton sx={{ pl: 3 }} component={NavLink} exact="true" to="/drugs">
            <ListItemIcon>
              <VaccinesIcon />
            </ListItemIcon>
            <ListItemText primary={"Treatements"} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 3 }} component={NavLink} exact="true" to="/treatments">
            <ListItemIcon>
              <HealingIcon />
            </ListItemIcon>
            <ListItemText primary={"Patients"} />
          </ListItemButton>
        </Collapse>

        <ListItemButton onClick={handleEffectClick}>
          <ListItemText primary={"Effects and moods"} />
          {openEffectDown ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openEffectDown} timeout="auto" unmountOnExit>
          <ListItemButton sx={{ pl: 3 }} component={NavLink} exact="true" to="/side-effects">
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary={"Side Effects"} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 3 }} component={NavLink} exact="true" to="/moods">
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary={"Moods"} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 3 }} component={NavLink} exact="true" to="/survey-moods">
            <ListItemIcon>
              <MoodIcon />
            </ListItemIcon>
            <ListItemText primary={"Survey Moods"} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 3 }} component={NavLink} exact="true" to="/survey-effects">
            <ListItemIcon>
              <SickIcon />
            </ListItemIcon>
            <ListItemText primary={"Survey Side effects"} />
          </ListItemButton>
        </Collapse>

        <ListItemButton onClick={handleFactoriesClick}>
          <ListItemText primary={"Factories"} />
          {openFactoriesDown ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openFactoriesDown} timeout="auto" unmountOnExit>
          <ListItemButton sx={{ pl: 3 }} component={NavLink} exact="true" to="/hospitals">
            <ListItemIcon>
              <LocalHospitalIcon />
            </ListItemIcon>
            <ListItemText primary={"Hospitals"} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 3 }} component={NavLink} exact="true" to="/laboratories">
            <ListItemIcon>
              <BiotechIcon />
            </ListItemIcon>
            <ListItemText primary={"Laboratories"} />
          </ListItemButton>
        </Collapse>

        <ListItemButton component={NavLink} exact="true" to="/settings">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={"My settings"} />
        </ListItemButton>

      </List>
    </Drawer>
  </ThemeProvider>
  );
}
