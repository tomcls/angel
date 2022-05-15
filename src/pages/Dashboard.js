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
export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [patients, setPatients] = React.useState(null);
  const [total, setTotal] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(5);
  React.useEffect( () => {
    console.log('useEffect dashboard');
    async function fetchData() {
      // You can await here
      const r = await AngelUser().list({ type: 'patient', limit: limit, page: page });
      setPatients(r.users);
      setTotal(r.total);
      // ...
    }
    fetchData();
  }, []);

  const handleChangePage = async (event,newPage) => {
    console.log('page',newPage)
    const r = await AngelUser().list({ type: 'patient', limit: limit, page: newPage });
      setPatients(r.users);
      setTotal(r.total);
      setPage(newPage);
  };
  const handleChangeLimit = async (event) => {
    console.log('handleChangeLimit',event.target.value)
    setLimit(event.target.value)
    setPage(0);
    const r = await AngelUser().list({ type: 'patient', limit: limit, page: 0 });
      setPatients(r.users);
      setTotal(r.total);
  };

  return (
      <Box sx={{ display: 'flex' }}>
        <Bar open={setOpen} />
        <Main open={open} style={{ background: "rgb(229 229 229 / 41%)", marginBlock: "64px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ marginBlock: "20px", width: "70%" }}>
              <Input icon={<SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }}/>} type="Outlined" text=" Search"/>
            </div>
            <Button variant="outlined" style={{ color: "black" }}>
              <PeopleIcon style={{ marginInline: "3px" }} /> Add patient</Button>
          </div>
          <Patients users={patients} total={total} page={page} limit={limit} setPage={handleChangePage} setLimit={handleChangeLimit} />
        </Main>
      </Box>
  );
}
