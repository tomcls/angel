import React, { useRef } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Input from "../components/Input";
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import PeopleIcon from '@mui/icons-material/People';
import Bar from "../templates/Bar";
import Doctors from "../containers/Doctors";
import Doctor from "../containers/Doctor";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Cancel } from "@mui/icons-material";
import { SnackbarProvider } from 'notistack';
import Patients from "../containers/Patients";
import { Grid, Typography } from "@mui/material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PatientContainer from "../containers/Patient";
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

export default function DoctorsPage() {

  const [open, setOpen] = React.useState(true);
  const [selectedTab, setSelectedTab] = React.useState("Main");
  const [tabs, setTabs] = React.useState([]);
  const [panels, setPanels] = React.useState([]);
  const [tabIndex, setTabIndex] = React.useState(2);
  const newDoctorBtn = useRef(null);

  React.useEffect(() => {
    console.log('useEffect Doctors page tabs length=', tabs.length, 'tabIndex', tabIndex);
  }, []);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const handleTabOptions = (value) => {
    setSelectedTab(value)
    setTabIndex(tabIndex + 1)
  }
  const createTab = () => {
    if (window.angel && window.angel.doctorId) {
      createTabPatients( window.angel.doctorId, 'list of patients');
      window.angel.doctorId = null;
    } else if (window.angel && window.angel.userId ) {
      console.log("zzzzzzz",window.angel.userId, window.angel.tabName)
      createTabPatient( window.angel.userId, window.angel.tabName);
      window.angel.treatmentId = null;
    } else {
      createTabDoctor();
    }
  }
  const createTabDoctor = ( userId, text) => {
    const value = text;
    const newTab = {
      label: text ? text : 'New doctor',
      value: value ? value : tabIndex,
      idx: tabIndex,
      child: () => <Doctor userId={userId}  showDoctorPatients={openDoctorPatientTab} />
    }
    setTabs([...tabs, newTab])
    handleTabOptions(value ? value : tabIndex);
  }
  const createTabPatients = ( userId, text) => {
    const value = `Blue Box ${tabIndex}`
    const newTab = {
      label: text,
      value: value,
      idx: tabIndex,
      child: () => <Patients openUser={openPatientTab} doctorId={userId} />
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
}
  const openDoctorPatientTab = (doctorId) => {
    if (!window.angel) {
      window.angel = {};
    }
    window.angel.doctorId = doctorId;
    newDoctorBtn.current.click();
  }
  const openPatientTab = (userId, text) => {
    console.log('openPatientTab',userId,text)
    if (!window.angel) {
      window.angel = {};
    }
    window.angel.userId = userId;
    window.angel.tabName = text;
    newDoctorBtn.current.click();
  }
  return (
    <SnackbarProvider maxSnack={3}>
      <Box sx={{ display: 'flex' }}>
        <Bar open={setOpen} />
        <Main open={open} style={{ background: "rgb(229 229 229 / 41%)", marginBlock: "64px" }}>
          <Grid container spacing={2} mb={'0px'} >
            <Grid item xs={6} md={6} xl={6} >
              <Typography variant="h6"  component="div" >
                Doctors
              </Typography>
            </Grid>
            <Grid item xs={6} md={6} xl={6} textAlign={'end'}  >
              <Button variant="outlined"  onClick={createTab} ref={newDoctorBtn} justifyContent="flex-end">
                <PeopleIcon /> Add doctor</Button>
            </Grid>
          </Grid>
          <Box sx={{ width: '100%' }}>
            <TabContext value={selectedTab ? selectedTab : '1'}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="" variant="scrollable" scrollButtons="auto" >
                  <Tab label="List" value="Main" icon={<FormatListBulletedIcon />} iconPosition="start" />
                  {tabs.map(tab => (
                    <Tab key={tab.idx} label={tab.label} value={tab.value} icon={<Cancel onClick={(e) => handleCloseTab(e, tab.idx)} />} iconPosition="end" />
                  ))}
                </TabList>
              </Box>
              <TabPanel value="Main" style={{ padding: "1px" }}>
                <Doctors openUser={createTabDoctor} />
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
