import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';

const App = () => {
  const usrs = JSON.parse(localStorage.getItem('users')) || [];
  const usr = JSON.parse(localStorage.getItem('loggedUser')) || undefined;

  const [users, setUsers] = useState(usrs);
  const [user, setUser] = useState(usr);

  const modifyUsers = (u) => setUsers([...users, u]);

  const modifyUser = (u) => setUser([...user, u]);

  const logout = () => {
    localStorage.removeItem("loggedUser");
    window.location.href = '/sign-in';
  };

  useEffect(() => {
    if (users) localStorage.setItem("users", JSON.stringify(users));
    if (user) localStorage.setItem("loggedUser", JSON.stringify(user));
  });

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
