import React, { useReducer } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Input from "../components/Input";
import SearchIcon from '@mui/icons-material/Search';
import Table from "../components/Table"
import Button from '@mui/material/Button';
import PeopleIcon from '@mui/icons-material/People';
import UserContext from "../contexts/userContext";
import Login from "../pages/Login";
import Bar from "../templates/Bar";
const drawerWidth = 240;

/*const USER_STATE = {
  user: null,
  hasLoginError: false
};
const validateCredentials = () => {
  console.log(localStorage.getItem('user'),localStorage.getItem('token'))
  const u = JSON.parse(localStorage.getItem('user'));
  const t = JSON.parse(localStorage.getItem('token'));
  if( u && u.id && t) {
    return u;
  }
  return false;
}*/
/*const reducer = (state, action) => {
  switch (action.type) {
    case "login": {
      const user = action.payload;
      if (!validateCredentials(action.payload)) {
        return {
          ...state,
          hasLoginError: true,
          user: null
        };
      }
      return {
        ...state,
        hasLoginError: false,
        user: action.payload
      };
    }
    case "logout":
      return {
        ...state,
        user: null
      };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};*/
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
  //const [state, dispatch] = useReducer(reducer, USER_STATE);
  const [open, setOpen] = React.useState(true);
  /*const [user, setUser] = React.useState(null);
  const currentValue = {
    user: state.user,
    hasLoginError: state.hasLoginError,
    login: (user) => {
      console.log('dispatch')
      dispatch({ type: "login", payload: user })
    },
    logout: () => dispatch({ type: "logout" })
  };*/
  React.useEffect(() => {
    console.log('useEffect')
    /*const u = validateCredentials();
    if(u) {
      setUser(u);
    }*/
  }, []);

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
          <Table />
        </Main>
      </Box>
  );
}
