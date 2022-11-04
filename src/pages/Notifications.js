import React, { useRef } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Notifications from "../containers/Notifications";
import Notification from "../containers/Notifications";
import { SnackbarProvider } from 'notistack';
import { Grid, Typography } from "@mui/material";
import Tabs from "../components/Tabs";
import MainBar from "../templates/MainBar";
import AppContext from "../contexts/AppContext";
import { useTranslation } from "../hooks/userTranslation";
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

export default function NotificationsPage() {

  const appContext = React.useContext(AppContext);
  const [userSession,] = React.useState(appContext.appState.user);
  const [lg] = useTranslation(userSession ? userSession.lang : 'en');

  const [open, setOpen] = React.useState(true);
  const [selectedTab, setSelectedTab] = React.useState("Main");
  const [tabs, setTabs] = React.useState([]);
  const [tabIndex, setTabIndex] = React.useState(2);
  const newBtn = useRef(null);
  const t = new Tabs('notification', tabIndex, tabs, setTabs, setSelectedTab, setTabIndex, newBtn, lg);

  React.useEffect(() => {
    let d = document.getElementById('newButton');
    if (d) {
      d.clk = function (id, text, type) { t.openTab(id, text, type); };
    }
  }, []);
  const createTabNotification = (userId, text) => {
    const value = text;
    const newTab = {
      label: text ? text : lg.get('New notification'),
      value: value ? value : tabIndex,
      idx: tabIndex,
      child: () => <Notification userId={userId} showNotificationPatients={openNotificationPatientTab} />
    }
    setTabs([...tabs, newTab])
    t.handleTabOptions(value ? value : tabIndex);
  }
  const openNotificationPatientTab = (notificationId) => {
    if (!window.angel) {
      window.angel = {};
    }
    window.angel.notificationId = notificationId;
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
                {lg.get('Notifications')}
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ width: '100%' }}>
            <Notifications openUser={createTabNotification} />
          </Box>
        </Main>
      </Box>
    </SnackbarProvider >
  );
}
