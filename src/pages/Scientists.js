import React, { useRef } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PeopleIcon from '@mui/icons-material/People';
import Bar from "../templates/Bar";
import Scientists from "../containers/Scientists";
import Scientist from "../containers/Scientist";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Cancel } from "@mui/icons-material";
import { SnackbarProvider } from 'notistack';
import Patients from "../containers/Patients";
import { Grid, Typography } from "@mui/material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PatientContainer from "../containers/Patient";
import Tabs from "../components/Tabs";
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

export default function ScientistsPage() {

  const [open, setOpen] = React.useState(true);
  const [selectedTab, setSelectedTab] = React.useState("Main");
  const [tabs, setTabs] = React.useState([]);
  const [tabIndex, setTabIndex] = React.useState(2);
  const newBtn = useRef(null);
  const t = new Tabs('scientist',tabIndex,tabs,setTabs,setSelectedTab,setTabIndex,newBtn);

  React.useEffect(() => {
    console.log('useEffect Scientists page tabs length=', tabs.length, 'tabIndex', tabIndex);
  }, []);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
 /* const handleTabOptions = (value) => {
    setSelectedTab(value)
    setTabIndex(tabIndex + 1)
  }
  const createTab = () => {
    if (window.angel && window.angel.scientistId) {
      createTabPatients(window.angel.scientistId, 'list of patients');
      window.angel.scientistId = null;
    } else if (window.angel && window.angel.userId ) {
      console.log("zzzzzzz",window.angel.userId, window.angel.tabName)
      createTabPatient( window.angel.userId, window.angel.tabName);
      window.angel.treatmentId = null;
    } else {
      createTabScientist();
    }
  }
  const createTabPatients = (userId, text) => {
    const value = `Blue Box ${tabIndex}`
    const newTab = {
      label: text,
      value: value,
      idx: tabIndex,
      child: () => <Patients openUser={openPatientTab} scientistId={userId} />
    }
    setTabs([...tabs, newTab])
    handleTabOptions(value ? value : tabIndex);
  }
  const createTabPatient = ( userId, text) => {
    const value = text;
    const newTab = {
      label: text ? text : 'New patient',
      value: value ? value : tabIndex,
      idx: tabIndex,
      child: () => <PatientContainer userId={userId} />
    }
    setTabs([...tabs, newTab])
    handleTabOptions(value ? value : tabIndex);
  }
  const handleCloseTab = (event, idx) => {
    event.stopPropagation();
    const tabArr = tabs.filter(x => x.idx !== idx)
    setTabs(tabArr)
    setSelectedTab('Main');
  }*/
  const createTabScientist = (userId, text) => {
    const value = text;
    const newTab = {
      label: text ? text : 'New Scientist',
      value: value ? value : tabIndex,
      idx: tabIndex,
      child: () => <Scientist userId={userId} showScientistPatients={openScientistPatientTab} />
    }
    setTabs([...tabs, newTab])
    t.handleTabOptions(value ? value : tabIndex);
  }
  const openScientistPatientTab = (scientistId) => {
    if (!window.angel) {
      window.angel = {};
    }
    window.angel.scientistId = scientistId;
    newBtn.current.click();
  }
  const openPatientTab = (userId, text) => {
    console.log('openPatientTab',userId,text)
    if (!window.angel) {
      window.angel = {};
    }
    window.angel.userId = userId;
    window.angel.tabName = text;
    newBtn.current.click();
  }
  return (
    <SnackbarProvider maxSnack={3}>
      <Box sx={{ display: 'flex' }}>
        <Bar open={setOpen} />
        <Main open={open} style={{ background: "rgb(229 229 229 / 41%)", marginBlock: "64px" }}>
          <Grid container spacing={2} mb={'0px'} >
            <Grid item xs={12} md={6} xl={6} >
              <Typography variant="h6"  component="div" >
                Scientists
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} xl={6} textAlign={'end'}  >
              <Button variant="outlined"  onClick={t.createTab} ref={newBtn} justifyContent="flex-end">
                <PeopleIcon /> Add scientist</Button>
            </Grid>
          </Grid>
          <Box sx={{ width: '100%' }}>
            <TabContext value={selectedTab ? selectedTab : '1'}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="" variant="scrollable" scrollButtons="auto" >
                  <Tab label="List" value="Main" icon={<FormatListBulletedIcon />} iconPosition="start" />
                  {tabs.map(tab => (
                    <Tab key={tab.idx} label={tab.label} value={tab.value} icon={<Cancel onClick={(e) => t.handleCloseTab(e, tab.idx)} />} iconPosition="end" />
                  ))}
                </TabList>
              </Box>
              <TabPanel value="Main" style={{ padding: "1px" }}>
                <Scientists openUser={createTabScientist} />
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
