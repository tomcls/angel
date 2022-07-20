import React, { useRef } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Bar from "../templates/Bar";
import SurveysMoods from "../containers/SurveyMoods";
import Mood from "../containers/Mood";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Typography from '@mui/material/Typography';
import { Grid } from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { SnackbarProvider } from 'notistack';
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

export default function SurveyMoodsPage() {

  const [open, setOpen] = React.useState(true);
  const [selectedTab, setSelectedTab] = React.useState("Main");
  const [tabs, setTabs] = React.useState([]);
  const [tabIndex, setTabIndex] = React.useState(2);
  const newMoodBtn = useRef(null);

  React.useEffect(() => {
    console.log('useEffect SurveysMoods page tabs length=', tabs.length, 'tabIndex', tabIndex);
  }, []);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const handleTabOptions = (value) => {
    setSelectedTab(value)
    setTabIndex(tabIndex + 1)
  }
  const createTab = () => {
    createTabMood();
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
  const handleCloseTab = (event, idx) => {
    event.stopPropagation();
    const tabArr = tabs.filter(x => x.idx !== idx)
    setTabs(tabArr)
    setSelectedTab('Main');
  }
  return (
    <SnackbarProvider maxSnack={3}>
      <Box sx={{ display: 'flex' }}>
        <Bar open={setOpen} />
        <Main open={open} style={{ background: "rgb(229 229 229 / 41%)", marginBlock: "64px" }}>
          <Grid container spacing={2} mb={'0px'} >
            <Grid item xs={12} md={6} xl={6} >
              <Typography variant="h6" component="div" >
              Surveys Moods
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} xl={6} textAlign={'end'}  >
              
            </Grid>
          </Grid>
          <Box sx={{ width: '100%' }}>
            <TabContext value={selectedTab ? selectedTab : '1'}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="" variant="scrollable" scrollButtons="auto" >
                  <Tab label="List" value="Main" />
                  {tabs.map(tab => (
                    <Tab key={tab.idx} label={tab.label} value={tab.value} icon={<Cancel onClick={(e) => handleCloseTab(e, tab.idx)} />} iconPosition="end" />
                  ))}
                </TabList>
              </Box>
              <TabPanel value="Main" style={{ padding: "1px" }}>
                <SurveysMoods openMood={createTabMood} />
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
