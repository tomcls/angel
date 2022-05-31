import React from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Input from "../components/Input";
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import PeopleIcon from '@mui/icons-material/People';
import Bar from "../templates/Bar";
import Patients from "../containers/Patients";
import AngelUser from '../api/angel/user';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {  Cancel } from "@mui/icons-material";
import RefreshIcon from '@mui/icons-material/Refresh';
import { SnackbarProvider } from 'notistack';
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

export default function Dashboard(props) {

  const [open, setOpen] = React.useState(true);
  const [patients, setPatients] = React.useState(null);
  const [total, setTotal] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(5);

  const [selectedTab, setSelectedTab] = React.useState('1');
  const [tabs, setTabs] = React.useState([]);
  const [panels, setPanels] = React.useState([]);
  const [tabIndex, setTabIndex] = React.useState(2);

  React.useEffect(() => {
    async function fetchData() {
      await getPatients();
    }
    fetchData();
  }, [limit, page]);
  const getPatients = async () => {
    const r = await AngelUser().list({ type: 'patient', limit: limit, page: page });
    setPatients(r.users);
    setTotal(r.total);
  }
  const handleChangePage = async (event, newPage) => {
    const r = await AngelUser().list({ type: 'patient', limit: limit, page: newPage });
    setPatients(r.users);
    setTotal(r.total);
    setPage(newPage);
  };
  const handleChangeLimit = async (event) => {
    setLimit(event.target.value)
    setPage(0);
    const r = await AngelUser().list({ type: 'patient', limit: limit, page: 0 });
    setPatients(r.users);
    setTotal(r.total);
  };
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const createNewTab = (userId, text) => {
    let v = 1;
    if(tabs.length){
      v = Math.max(...tabs.map(o =>parseInt(o.value,10)));
    }
    const newTabIndex= v +1;
    const label = text?text:'New user';
    const newTab = {
      value: `${newTabIndex}`,
      label: label
    }
    setTabs([...tabs, newTab]);
    setPanels([
      ...panels,
      {
        value: `${newTabIndex}`,
        child: () => {
          return <Patient userId={userId} />
        }
      }
    ]);
    setSelectedTab(`${newTabIndex}`);
    setTabIndex(newTabIndex);
  }

  const handleTabClose = (event,value) => {
    event.stopPropagation();
    const tabArr = tabs.filter(t => t.value !== value);
    setTabs(tabArr);
    const panelArr = panels.filter(p => p.value !== value);
    setPanels(panelArr);
    setSelectedTab('1');
    setTabIndex(1);
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
          <Button variant="outlined" style={{ color: "black" }} onClick={createNewTab}>
            <PeopleIcon style={{ marginInline: "3px" }} /> Add patient</Button>
        </div>
        <Box sx={{ width: '100%' }}>
          <TabContext value={selectedTab?selectedTab:'1'}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example" variant="scrollable" scrollButtons="auto" >
                <Tab label="Patients" value="1" icon={<RefreshIcon onClick={getPatients}/>} iconPosition="end" />
                {tabs.map(tab => (
                  <Tab key={tab.value} label={tab.label} value={tab.value} icon={<Cancel onClick={ (event) => handleTabClose(event,tab.value)} />} iconPosition="end" />
                ))}
              </TabList>
            </Box>
            <TabPanel value="1" style={{ padding: "1px" }}>
              <Patients users={patients} total={total} page={page} limit={limit} setPage={handleChangePage} setLimit={handleChangeLimit} openUser={createNewTab} />
            </TabPanel>
            {panels.map(panel => (
              <TabPanel key={panel.value} label={panel.label} value={panel.value} >
                {panel.child()}
                </TabPanel>
            ))}
          </TabContext>
        </Box>
      </Main>
    </Box>
    </SnackbarProvider>
  );
}
