import React from "react";
import PropTypes from 'prop-types';
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
import {  AddCircleOutline, AdminPanelSettings, Cancel } from "@mui/icons-material";
import { tab } from "@testing-library/user-event/dist/tab";
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

export default function PatientsPage(props) {

  const [value, setValue] = React.useState(0);
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
    console.log('useEffect dashboard');
    async function fetchData() {
      // You can await here
      const r = await AngelUser().list({ type: 'patient', limit: limit, page: page });
      setPatients(r.users);
      setTotal(r.total);
      // ...
    }
    fetchData();
  }, [limit, page]);

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
    console.log("handleChange", newValue);
    setSelectedTab(newValue);
  };
  const createNewTab = () => {
    const newTab = {
      value: `${tabIndex}`,
      label: `Dynamic Tab ${tabIndex}`
    }
    setTabs([...tabs, newTab]);
    setPanels([
      ...panels,
      {
        value: `${tabIndex}`,
        child: () => {
          return <div> Hello {tabIndex}</div>
        }
      }
    ]);
    console.log('setSelectedTab',tabIndex)
    setSelectedTab(`${tabIndex}`);
    setTabIndex(tabIndex + 1);
  }
  const handleTabClose = (value) => {
    const tabArr = tabs.filter(t => t.value !== value);
    setTabs(tabArr);
    const panelArr = panels.filter(p => p.value !== value);
    setPanels(panelArr);
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <Bar open={setOpen} />
      <Main open={open} style={{ background: "rgb(229 229 229 / 41%)", marginBlock: "64px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ marginBlock: "20px", width: "70%" }}>
            <Input icon={<SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />} type="Outlined" text=" Search" />
          </div>
          <Button variant="outlined" style={{ color: "black" }}>
            <PeopleIcon style={{ marginInline: "3px" }} /> Add patient</Button>
        </div>
        <Box sx={{ width: '100%' }}>
          <TabContext value={selectedTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example" variant="scrollable" scrollButtons="auto" >
                <Tab label="Patients" value="1" icon={<AddCircleOutline onClick={createNewTab}/>} iconPosition="end" />
                {tabs.map(tab => (
                  <Tab key={tab.value} label={tab.label} value={tab.value} icon={<Cancel onClick={ () => handleTabClose(tab.value)} />} iconPosition="end" />
                ))}
              </TabList>
            </Box>
            <TabPanel value="1">
              <Patients users={patients} total={total} page={page} limit={limit} setPage={handleChangePage} setLimit={handleChangeLimit} />
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
  );
}
