import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';

import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  const usrs = JSON.parse(localStorage.getItem('users')) || [];
  const usr = JSON.parse(localStorage.getItem('loggedUser')) || undefined;

  const [users, setUsers] = useState(usrs);
  const [user, setUser] = useState(usr);

  const modifyUsers = (u) => {
    const index = users.findIndex(function (usr) { return usr.user === u.user; });
    users.splice(index, index >= 0 ? 1 : 0);

    setUsers([...users, u]);
  };

  const modifyUser = (u) => {
    setUser({ ...u });
    modifyUsers(user);
  };

  const logout = () => {
    localStorage.removeItem("loggedUser");
    window.location.href = '/sign-in';
  };

  useEffect(() => {
    if (users) localStorage.setItem("users", JSON.stringify(users));
    if (user) localStorage.setItem("loggedUser", JSON.stringify(user));
  });

  return (
    <div style={{
      textAlign: 'center',
      width: '100%',
      height: '100%'
    }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Switch>
            <Route path="/sign-in">
              <SignIn
                users={users}
                user={user}
                onSetUsers={modifyUsers}
                onSetUser={modifyUser}
              />
            </Route>
            <Route path="/sign-up">
              <SignUp
                users={users}
                user={user}
                onSetUsers={modifyUsers}
                onSetUser={modifyUser}
              />
            </Route>
            <Route exact path="/">
              <Home
                users={users}
                user={user}
                onSetUsers={modifyUsers}
                onSetUser={modifyUser}
                onLogout={logout}
              />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
