import React, { useRef, useMemo } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PeopleIcon from '@mui/icons-material/People';
import Patients from "../containers/Patients";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Cancel } from "@mui/icons-material";
import { SnackbarProvider } from 'notistack';
import Typography from '@mui/material/Typography';
import { Grid } from "@mui/material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Tabs from '../components/Tabs';
import MainBar from "../templates/MainBar";
import Translation from '../utils/translation';
import { useStore } from "../utils/store";
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

export default function PatientsPage() {

  const [open, setOpen] = React.useState(true);
  const [selectedTab, setSelectedTab] = React.useState('Main');
  const [tabs, setTabs] = React.useState([]);
  const [tabIndex, setTabIndex] = React.useState(2);
  const newBtn = useRef(null);
  const { session,s } = useStore();
  console.log("bbbbbbb",s)
  const [userStg, ] = React.useState(session && session.user ? session.user:null);
  const lg = new Translation(userStg ? userStg.lang: 'en');
  const t = useMemo(() => {
    return new Tabs('patient', tabIndex, tabs, setTabs, setSelectedTab, setTabIndex, newBtn)
  }, [tabIndex, tabs]);

  React.useEffect(() => {
    console.log('useEffect patients page');
    let d = document.getElementById('newButton');
    if (d) {
      d.clk = function (id, text, type, panel) { t.openTab(id, text, type, panel); };
    }
  }, [t]);
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const openPatientTab = (userId, text) => {
    t.createTab('patient', text, userId)
  }
  return (
    <SnackbarProvider maxSnack={3}>
      <Box sx={{ display: 'flex' }}>
        <MainBar open={setOpen} />
        <Main open={open}>
          <Grid container mb={'0px'} mt={6} >
            <Grid item xs={6} md={6} xl={6} >
              <Typography variant="h6" component="div" >
                {lg.get('Patients')}
              </Typography>
            </Grid>
            <Grid item xs={6} md={6} xl={6} textAlign={'end'}  >
              <Button variant="outlined" onClick={t.onOpenTabClick} justifyContent="flex-end" ref={newBtn} id="newButton">
                <PeopleIcon /> {lg.get('Add patient')}</Button>
            </Grid>
          </Grid>
          <Box sx={{ width: '100%' }}>
            <TabContext value={selectedTab ? selectedTab : '1'}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="" variant="scrollable" scrollButtons="auto" >
                  <Tab label= {lg.get('List')} value="Main" icon={<FormatListBulletedIcon />} iconPosition="start" />
                  {tabs.map(tab => (
                    <Tab key={tab.idx} label={tab.label} value={tab.value} icon={<Cancel onClick={(e) => t.handleCloseTab(e, tab.idx)} />} iconPosition="end" />
                  ))}
                </TabList>
              </Box>
              <TabPanel value="Main" style={{ padding: "1px" }}>
                <Patients openUser={openPatientTab} openNurses={t.openTab} openDoctors={t.openTab} openTreatments={t.openTab} />
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
