import React from "react";
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Bar from "../templates/Bar";
import Grid from '@mui/material/Grid';
import AngelUser from '../api/angel/user';
import { TextField } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
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

export default function Patient(props) {

  const [open, setOpen] = React.useState(true);
  const [userId, setUserId] = React.useState(null);
  const [patient, setPatient] = React.useState(null);

  const [firstname, setFirstname] = React.useState(null);
  const [lastname, setLastname] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [sex, setSex] = React.useState(null);
  const [lang, setLang] = React.useState(null);
  const [closeMonitoring, setCloseMonitoring] = React.useState(null);
  const [dateOfBirth, setDateOfBirth] = React.useState(null);
  const [emergencyContactName, setEmergencyContactName] = React.useState(null);
  const [emergencyContactRelationship, setEmergencyContactRelationship] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
  const [emergencyContactPhone, setEmergencyContactPhone] = React.useState(null);

  React.useEffect(() => {
    console.log('useEffect dashboard');
    async function fetchData() {
      // You can await here
      if(userId) {
        const r = await AngelUser().find({ id: userId });
        setPatient(r);
      }
      // ...
    }
    fetchData();
  }, []);


  return (
    <Box sx={{ display: 'flex' }}>
      <Bar open={setOpen} />
      <Main open={open} style={{ background: "rgb(229 229 229 / 100%)", marginBlock: "0px" }}>
          <PatientContainer/>
      </Main>
    </Box>
  );
}
