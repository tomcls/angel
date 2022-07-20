import React, { useRef } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Input from "../components/Input";
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import PeopleIcon from '@mui/icons-material/People';
import Bar from "../templates/Bar";
import Treatments from "../containers/Treatments";
import Treatment from "../containers/Treatment";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Cancel } from "@mui/icons-material";
import { SnackbarProvider } from 'notistack';
import Drugs from "../containers/Drugs";
import Patients from "../containers/Patients";
import Patient from "../containers/Patient";
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

export default function TreatmentsPage() {

  const [open, setOpen] = React.useState(true);
  const [selectedTab, setSelectedTab] = React.useState("Main");
  const [tabs, setTabs] = React.useState([]);
  const [panels, setPanels] = React.useState([]);
  const [tabIndex, setTabIndex] = React.useState(2);
  const newTreatmentBtn = useRef(null);

  React.useEffect(() => {
    console.log('useEffect Treatments page tabs length=', tabs.length, 'tabIndex', tabIndex);
  }, []);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const handleTabOptions = (value) => {
    setSelectedTab(value)
    setTabIndex(tabIndex + 1)
  }
  const createTab = () => {
    console.log(window.angel);
    if (window.angel && window.angel.treatmentId && window.angel.modal === 'drugs') {
      createTabDrugs( window.angel.treatmentId, 'list drugs');
      window.angel.treatmentId = null;
    } else if (window.angel && window.angel.treatmentId && window.angel.modal === 'patients') {
      createTabPatients( window.angel.treatmentId, 'List patients');
      window.angel.treatmentId = null;
    } else if (window.angel && window.angel.userId ) {
      console.log("zzzzzzz",window.angel.userId, window.angel.tabName)
      createTabPatient( window.angel.userId, window.angel.tabName);
      window.angel.treatmentId = null;
    } else {
      createTabTreatment();
    }
  }
  const createTabTreatment = ( treatmentId, text) => {
    const value = text;
    const newTab = {
      label: text?text:'New Treatment',
      value: value?value:tabIndex,
      idx: tabIndex,
      child: () => <Treatment treatmentId={treatmentId} showTreatmentDrugs={openDrugsTab} showTreatmentPatients={openPatientsTab}   />
    }
    setTabs([...tabs, newTab])
    handleTabOptions( value?value:tabIndex);
  }

  const createTabPatient = ( userId, text) => {
    const value = text;
    const newTab = {
      label: text ? text : 'New patient',
      value: value ? value : tabIndex,
      idx: tabIndex,
      child: () => <Patient userId={userId} />
    }
    setTabs([...tabs, newTab])
    handleTabOptions(value ? value : tabIndex);
  }
  const createTabPatients = ( treatmentId, text) => {
    console.log('createTabPatients',treatmentId)
    const value = `Blue Box ${tabIndex}`
    const newTab = {
      label: text,
      value: value,
      idx: tabIndex,
      child: () => <Patients openUser={openPatientTab} treatmentId={treatmentId} />
    }
    setTabs([...tabs, newTab])
    handleTabOptions(value);
  }
  const createTabDrugs = ( treatmentId, text) => {
    console.log('createTabDrugs',treatmentId)
    const value = `Blue Box ${tabIndex}`
    const newTab = {
      label: text,
      value: value,
      idx: tabIndex,
      child: () => <Drugs openDrug={createTabDrugs} treatmentId={treatmentId} />
    }
    setTabs([...tabs, newTab])
    handleTabOptions(value);
  }
  const handleCloseTab = (event, idx) => {
    event.stopPropagation();
    const tabArr = tabs.filter(x => x.idx !== idx)
    setTabs(tabArr)
    setSelectedTab('Main');
}
  const openDrugsTab = (treatmentId) => {
    console.log('openDrugsTab',treatmentId)
    if (!window.angel) {
      window.angel = {};
    }
    window.angel.treatmentId = treatmentId;
    window.angel.modal = 'drugs';
    newTreatmentBtn.current.click();
  }
  const openPatientsTab = (treatmentId) => {
    console.log('openPatientsTab',treatmentId)
    if (!window.angel) {
      window.angel = {};
    }
    window.angel.treatmentId = treatmentId;
    window.angel.modal = 'patients';
    newTreatmentBtn.current.click();
  }
  const openPatientTab = (userId, text) => {
    console.log('openPatientTab',userId,text)
    if (!window.angel) {
      window.angel = {};
    }
    window.angel.userId = userId;
    window.angel.tabName = text;
    newTreatmentBtn.current.click();
  }
  return (
    <SnackbarProvider maxSnack={3}>
      <Box sx={{ display: 'flex' }}>
        <Bar open={setOpen} />
        <Main open={open} style={{ background: "rgb(229 229 229 / 41%)", marginBlock: "64px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ marginBlock: "20px", width: "70%" }}>
              <Input icon={<SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />} type="Outlined" text=" Search" />
            </div>
            <Button variant="outlined" style={{ color: "black" }} onClick={createTab} ref={newTreatmentBtn} >
              <PeopleIcon style={{ marginInline: "3px" }} /> Add treatment</Button>
          </div>
          <Box sx={{ width: '100%' }}>
            <TabContext value={selectedTab ? selectedTab : '1'}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="" variant="scrollable" scrollButtons="auto" >
                  <Tab label="Treatments" value="Main" icon={<RefreshIcon />} iconPosition="end" />
                  {tabs.map(tab => (
                    <Tab key={tab.idx} label={tab.label} value={tab.value} icon={<Cancel onClick={(e) => handleCloseTab(e, tab.idx)} />} iconPosition="end" />
                  ))}
                </TabList>
              </Box>
              <TabPanel value="Main" style={{ padding: "1px" }}>
                <Treatments openTreatment={createTabTreatment} />
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
