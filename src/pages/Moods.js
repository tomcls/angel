import React, { useRef } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PeopleIcon from '@mui/icons-material/People';
import Moods from "../containers/Moods";
import Mood from "../containers/Mood";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Cancel } from "@mui/icons-material";
import { SnackbarProvider } from 'notistack';
import { Grid, Typography } from "@mui/material";
import NurseContainer from "../containers/Nurse";
import Patients from "../containers/Patients";
import Drugs from "../containers/Drugs";
import Doctors from "../containers/Doctors";
import Nurses from "../containers/Nurses";
import PatientContainer from "../containers/Patient";
import MainBar from "../templates/MainBar";
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

export default function MoodsPage() {

  const [open, setOpen] = React.useState(true);
  const [selectedTab, setSelectedTab] = React.useState("Main");
  const [tabs, setTabs] = React.useState([]);
  const [tabIndex, setTabIndex] = React.useState(2);
  const newBtn = useRef(null);

  React.useEffect(() => {
    console.log('useEffect Moods page');
  }, []);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const handleTabOptions = (value) => {
    setSelectedTab(value)
    setTabIndex(tabIndex + 1)
  }
  const createTabMood = (moodId, text) => {
    const value = text;
    const newTab = {
      label: text ? text : 'New Mood',
      value: value ? value : tabIndex,
      idx: tabIndex,
      child: () => <Mood moodId={moodId} langId={'en'} />
    }
    setTabs([...tabs, newTab])
    handleTabOptions(value ? value : tabIndex);
  }

  const onOpenTabClick = () => {
    if (window.angel && window.angel.userId && window.angel.tabType === 'nurses') {
      createTab('nurses', window.angel.tabName, window.angel.userId);
      window.angel.userId = null;
      window.angel.tabType = null;
      window.angel.tabName = null;
    } else if (window.angel && window.angel.userId && window.angel.tabType === 'doctors') {
      createTab('doctors', window.angel.tabName, window.angel.userId);
      window.angel.userId = null;
      window.angel.tabType = null;
      window.angel.tabName = null;
    } else if (window.angel && window.angel.userId && window.angel.tabType === 'treatments') {
      createTab('treatments', window.angel.tabName, window.angel.userId);
      window.angel.userId = null;
      window.angel.tabType = null;
      window.angel.tabName = null;
    } else if (window.angel && window.angel.treatmentId && window.angel.tabType === 'treatment') {
      createTab('treatment', window.angel.tabName, window.angel.treatmentId);
      window.angel.treatmentId = null;
      window.angel.tabType = null;
      window.angel.tabName = null;
    } else if (window.angel && window.angel.nurseId) {
      createTab('nurse_patients', window.angel.tabName, window.angel.nurseId);
      window.angel.nurseId = null;
      window.angel.tabType = null;
      window.angel.tabName = null;
    } else if (window.angel && window.angel.treatmentId && window.angel.tabType === 'treatment_drugs') {
      createTab('treatment_drugs', window.angel.tabName, window.angel.treatmentId);
      window.angel.treatmentId = null;
      window.angel.tabType = null;
      window.angel.tabName = null;
    } else if (window.angel && window.angel.treatmentId && window.angel.tabType === 'treatments') {
      createTab('treatment_patients', window.angel.tabName, window.angel.treatmentId);
      window.angel.treatmentId = null;
      window.angel.tabType = null;
      window.angel.tabName = null;
    } else if (window.angel && window.angel.doctorId) {
      createTab('doc_patients', window.angel.tabName, window.angel.doctorId);
      window.angel.doctorId = null;
      window.angel.tabType = null;
      window.angel.tabName = null;
    } else if (window.angel && window.angel.userId && window.angel.tabType === 'doctor') {
      createTab('doctor', window.angel.tabName, window.angel.userId);
      window.angel.userId = null;
      window.angel.tabType = null;
      window.angel.tabName = null;
    } else if (window.angel && window.angel.userId && window.angel.tabType === 'patient') {
      createTab('patient', window.angel.tabName, window.angel.userId);
      window.angel.userId = null;
      window.angel.tabType = null;
      window.angel.tabName = null;
    } else if (window.angel && window.angel.userId && window.angel.tabType === 'nurse') {
      createTab('nurse', window.angel.tabName, window.angel.userId);
      window.angel.userId = null;
      window.angel.tabType = null;
      window.angel.tabName = null;
    } else {
      createTab('treatment', 'New treatment');
    }
  }
  const getTab = (v) => {
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].value === v) {
        return tabs[i];
      }
    }
    return null;
  }
  const handleCloseTab = (event, idx) => {
    event.stopPropagation();
    const tabArr = tabs.filter(x => x.idx !== idx)
    setTabs(tabArr)
    setSelectedTab('Main');
  }

  const createTab = (type, text, id) => {
    console.log('createTab', type, text, id)
    const value = text;
    let tab = getTab(value);
    let newTab = null;
    if (tab) {
      setSelectedTab(tab.value);
    } else {
      newTab = {
        label: text,
        value: value ? value : tabIndex,
        idx: tabIndex,
        child: () => {
          switch (type) {
            case 'nurse':
              return <NurseContainer userId={id} />
            case 'patient':
              return <PatientContainer userId={id} />
            case 'treatment_patients':
              return <Patients treatmentId={id} />
            case 'treatment_drugs':
              return <Drugs treatmentId={id} />
            case 'nurse_patients':
              return <Patients nurseId={id} openNurses={() => setSelectedTab('Main')} openDoctors={() => setSelectedTab('Main')} openTreatments={() => setSelectedTab('Main')} />
            case 'doc_patients':
              return <Patients doctorId={id} openDoctors={() => setSelectedTab('Main')} openNurses={() => setSelectedTab('Main')} openTreatments={() => setSelectedTab('Main')} />
            case 'doctors':
              return <Doctors patientId={id} openPatients={openTab} />
            case 'nurses':
              return <Nurses patientId={id} openPatients={openTab} />
            default:
              return;
          }
        }
      }
      setTabs([...tabs, newTab])
      handleTabOptions(value ? value : tabIndex);
    }
  }
  const openTab = (id, text, type) => {
    console.log('openTab', type, text, id)
    if (!window.angel) {
      window.angel = {};
    }
    switch (type) {
      case 'doctor':
        window.angel.userId = id;
        window.angel.tabType = 'doctor';
        window.angel.tabName = 'Doc ' + text;
        break;
      case 'patient':
        window.angel.userId = id;
        window.angel.tabType = 'patient';
        window.angel.tabName = 'patient ' + text;
        break;
      case 'nurse':
        window.angel.userId = id;
        window.angel.tabType = 'nurse';
        window.angel.tabName = 'Nurse ' + text;
        break;
      case 'patient_doctors':
        window.angel.userId = id;
        window.angel.tabType = 'doctors';
        window.angel.tabName = 'Doctors of ' + text;
        break;
      case 'patient_nurses':
        window.angel.userId = id;
        window.angel.tabType = 'nurses';
        window.angel.tabName = 'Nurses of ' + text;
        break;
      case 'nurse_patients':
        window.angel.nurseId = id;
        window.angel.tabName = 'Patients of ' + text;
        break;
      case 'doc_patients':
        window.angel.doctorId = id;
        window.angel.tabName = 'Patients of Doc ' + text;
        break;
      case 'treatment_patients':
        window.angel.tabType = 'treatments';
        window.angel.treatmentId = id;
        window.angel.tabName = 'Patients of ' + text;
        break;
      case 'treatment_drugs':
        window.angel.tabType = 'treatment_drugs';
        window.angel.treatmentId = id;
        window.angel.tabName = 'Drugs of treatment ' + text;
        break;
      case 'doctors':
        window.angel.userId = id;
        window.angel.tabType = 'doctors';
        window.angel.tabName = 'Doctors of ' + text;
        break;
      case 'treatments':
        window.angel.userId = id;
        window.angel.tabType = 'treatments';
        window.angel.tabName = 'Treatments of ' + text;
        break;
      case 'treatment':
        window.angel.treatmentId = id;
        window.angel.tabType = 'treatment';
        window.angel.tabName = 'Treatment ' + text;
        break;
      default:
        return;
    }
    newBtn.current.click();
  }

  return (
    <SnackbarProvider maxSnack={3}>
      <Box sx={{ display: 'flex' }}>
        <MainBar open={setOpen} />
        <Main open={open}>
          <Grid container mb={'0px'} mt={6} >
            <Grid item xs={12} md={6} xl={6} >
              <Typography variant="h6" component="div" >
                Treatments
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} xl={6} textAlign={'end'}  >
              <Button variant="outlined" onClick={onOpenTabClick} ref={newBtn} justifyContent="flex-end" id="newButton">
                <PeopleIcon /> Add treatment</Button>
            </Grid>
          </Grid>
          <Box sx={{ width: '100%' }}>
            <TabContext value={selectedTab ? selectedTab : '1'}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="" variant="scrollable" scrollButtons="auto" >
                  <Tab label="Moods" value="Main" icon={<RefreshIcon />} iconPosition="end" />
                  {tabs.map(tab => (
                    <Tab key={tab.idx} label={tab.label} value={tab.value} icon={<Cancel onClick={(e) => handleCloseTab(e, tab.idx)} />} iconPosition="end" />
                  ))}
                </TabList>
              </Box>
              <TabPanel value="Main" style={{ padding: "1px" }}>
                <Moods openMood={createTabMood} />
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
