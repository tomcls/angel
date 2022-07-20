import React, { useRef } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Input from "../components/Input";
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import PeopleIcon from '@mui/icons-material/People';
import Bar from "../templates/Bar";
import Drugs from "../containers/Drugs";
import Drug from "../containers/Drug";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import RefreshIcon from '@mui/icons-material/Refresh';
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

export default function DrugsPage() {

  const [open, setOpen] = React.useState(true);
  const [selectedTab, setSelectedTab] = React.useState("Main");
  const [tabs, setTabs] = React.useState([]);
  const [panels, setPanels] = React.useState([]);
  const [tabIndex, setTabIndex] = React.useState(2);
  const newDrugBtn = useRef(null);

  React.useEffect(() => {
    console.log('useEffect Drugs page tabs length=', tabs.length, 'tabIndex', tabIndex);
  }, []);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const handleTabOptions = (value) => {
    setSelectedTab(value)
    setTabIndex(tabIndex + 1)
  }
  const createTab = () => {
    createTabDrug();
  }
  const createTabDrug = ( drugId, text) => {
    console.log(drugId);
    const value = text;
    console.log(value,tabIndex)
    const newTab = {
      label: text?text:'New Drug',
      value: value?value:tabIndex,
      idx: tabIndex,
      child: () => <Drug drugId={drugId}   />
    }
    setTabs([...tabs, newTab])
    handleTabOptions( value?value:tabIndex);
  }
  const handleCloseTab = (event, idx) => {
    event.stopPropagation();
    const tabArr = tabs.filter(x => x.idx !== idx)
    setTabs(tabArr)
    setSelectedTab('Main');
}
  const openDrugDrugTab = (drugId) => {
    if (!window.angel) {
      window.angel = {};
    }
    window.angel.drugId = drugId;
    newDrugBtn.current.click();
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
            <Button variant="outlined" style={{ color: "black" }} onClick={createTab} ref={newDrugBtn} >
              <PeopleIcon style={{ marginInline: "3px" }} /> Add drug</Button>
          </div>
          <Box sx={{ width: '100%' }}>
            <TabContext value={selectedTab ? selectedTab : '1'}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="" variant="scrollable" scrollButtons="auto" >
                  <Tab label="Drugs" value="Main" icon={<RefreshIcon />} iconPosition="end" />
                  {tabs.map(tab => (
                    <Tab key={tab.idx} label={tab.label} value={tab.value} icon={<Cancel onClick={(e) => handleCloseTab(e, tab.idx)} />} iconPosition="end" />
                  ))}
                </TabList>
              </Box>
              <TabPanel value="Main" style={{ padding: "1px" }}>
                <Drugs openDrug={createTabDrug} />
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
