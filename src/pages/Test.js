import React, { useReducer } from "react";

import UserContext from "../contexts/userContext";
import Login from "./Login";

const USERNAME = "dev";
const PASSWORD = "password";

const INITIAL_STATE = {
  user: null,
  hasLoginError: false
};

const validateCredentials = (username, password) =>
  username === USERNAME && password === PASSWORD;

const reducer = (state, action) => {
    console.log(state, action)
  switch (action.type) {
    case "login": {
      const { username, password } = action.payload;
      console.log("reducer.login")
      if (!validateCredentials(username, password)) {
        return {
          ...state,
          hasLoginError: true,
          user: null
        };
      }

      return {
        ...state,
        hasLoginError: false,
        user: {
          id: 1,
          username: USERNAME,
          firstName: "Dev",
          lastName: "To"
        }
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
};

export default function Test() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const currentValue = {
    user: state.user,
    hasLoginError: state.hasLoginError,
    login: (username, password) => {

        console.log('dispatch')
        dispatch({
            type: "login",
            payload: { username, password }
          })

    }
      ,
    logout: () => dispatch({ type: "logout" })
  };

  return (
    <UserContext.Provider value={currentValue}>
      {state.user && <div className="user-profile">
      <h1>Welcome !</h1>
      <p>You're logged in now!</p>
      <button >Logout</button>
    </div>}
      {!state.user && <Login />}
    </UserContext.Provider>
  );
}
