import React, { useRef } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Button from '@mui/material/Button';
import PeopleIcon from '@mui/icons-material/People';
import Bar from "../templates/Bar";
import PatientTreatments from "../containers/PatientTreatments";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Cancel } from "@mui/icons-material";
import { SnackbarProvider } from 'notistack';
import Drugs from "../containers/Drugs";
import { Grid, Typography } from "@mui/material";
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

export default function TreatmentsPage() {

  const [open, setOpen] = React.useState(true);
  const [selectedTab, setSelectedTab] = React.useState("Main");
  const [tabs, setTabs] = React.useState([]);
  const [panels, setPanels] = React.useState([]);
  const [tabIndex, setTabIndex] = React.useState(2);
  const newBtn = useRef(null);
  const t = new Tabs('treatment',tabIndex,tabs,setTabs,setSelectedTab,setTabIndex,newBtn);

  React.useEffect(() => {
    console.log('useEffect Treatments page tabs length=', tabs.length, 'tabIndex', tabIndex);
    let d = document.getElementById('newButton');
    if (d) {
      d.clk = function (id, text, type,panel) { t.openTab(id, text, type,panel); };
    }
  }, []);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
 
  const createTabDrugs = (treatmentId, text) => {
    console.log('createTabDrugs', treatmentId)
    const value = `Blue Box ${tabIndex}`
    const newTab = {
      label: text,
      value: value,
      idx: tabIndex,
      child: () => <Drugs openDrug={createTabDrugs} treatmentId={treatmentId} />
    }
    setTabs([...tabs, newTab])
    t.handleTabOptions(value);
  }

  return (
    <SnackbarProvider maxSnack={3}>
      <Box sx={{ display: 'flex' }}>
        <Bar open={setOpen} />
        <Main open={open} style={{ background: "rgb(229 229 229 / 41%)", marginBlock: "64px" }}>
          <Grid container spacing={2} mb={'0px'} >
            <Grid item xs={12} md={6} xl={6} >
              <Typography variant="h6" component="div" >
                Treatments
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} xl={6} textAlign={'end'}  >
              <Button variant="outlined" onClick={t.onOpenTabClick} ref={newBtn} justifyContent="flex-end" id="newButton">
                <PeopleIcon /> Add treatment</Button>
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
                <PatientTreatments openTreatment={t.openTab} />
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
