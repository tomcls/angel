import React, { useRef } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PeopleIcon from '@mui/icons-material/People';
import SideEffects from "../containers/SideEffects";
import SideEffect from "../containers/SideEffect";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Cancel } from "@mui/icons-material";
import { SnackbarProvider } from 'notistack';
import { Grid, Typography } from "@mui/material";
import MainBar from "../templates/MainBar";
import { useStore } from "../utils/store";
import Translation from "../utils/translation";
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

export default function SideEffectsPage() {

  const { session, } = useStore();
  const [userSession,] = React.useState(session.user ? session.user : null);
  const lg = new Translation(userSession ? userSession.lang : 'en');

  const [open, setOpen] = React.useState(true);
  const [selectedTab, setSelectedTab] = React.useState("Main");
  const [tabs, setTabs] = React.useState([]);
  const [tabIndex, setTabIndex] = React.useState(2);
  const newBtn = useRef(null);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const handleTabOptions = (value) => {
    setSelectedTab(value)
    setTabIndex(tabIndex + 1)
  }
  const handleCloseTab = (event, idx) => {
    event.stopPropagation();
    const tabArr = tabs.filter(x => x.idx !== idx)
    setTabs(tabArr)
    setSelectedTab('Main');
  }

  const createTabSideEffect = (sideEffectId, text) => {
    const value = text;
    const newTab = {
      label: text ? text : lg.get('New side effect'),
      value: value ? value : tabIndex,
      idx: tabIndex,
      child: () => <SideEffect sideEffectId={sideEffectId} langId={'en'} />
    }
    setTabs([...tabs, newTab])
    handleTabOptions(value ? value : tabIndex);
  }
  return (
    <SnackbarProvider maxSnack={3}>
      <Box sx={{ display: 'flex' }}>
        <MainBar open={setOpen} />
        <Main open={open}>
          <Grid container mb={'0px'} mt={6} >
            <Grid item xs={12} md={6} xl={6} >
              <Typography variant="h6" component="div" >
                {lg.get('Side effects')}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} xl={6} textAlign={'end'}  >
              <Button variant="outlined" onClick={createTabSideEffect} ref={newBtn} justifyContent="flex-end" id="newButton">
                <PeopleIcon />{lg.get('Add side effect')}</Button>
            </Grid>
          </Grid>
          <Box sx={{ width: '100%' }}>
            <TabContext value={selectedTab ? selectedTab : '1'}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="" variant="scrollable" scrollButtons="auto" >
                  <Tab label={lg.get('List')} value="Main" icon={<FormatListBulletedIcon />} iconPosition="start" />
                  {tabs.map(tab => (
                    <Tab key={tab.idx} label={tab.label} value={tab.value} icon={<Cancel onClick={(e) => handleCloseTab(e, tab.idx)} />} iconPosition="end" />
                  ))}
                </TabList>
              </Box>
              <TabPanel value="Main" style={{ padding: "1px" }}>
                <SideEffects openSideEffect={createTabSideEffect} />
              </TabPanel>
              {tabs.map(panel => (
                <TabPanel key={panel.idx} label={panel.label} value={panel.value} >
                  {panel.child()}
                </TabPanel>
              ))}
            </TabContext>
          </Box>
        </Main>
      </Box>
    </SnackbarProvider >
  );
}
