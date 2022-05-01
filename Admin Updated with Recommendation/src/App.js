import React, { useState, useContext } from "react";
import Main from "./components/main/Main";

import SendMessage from "./components/management/SendMessage";
import ImportExcelSheet from "./components/management/ImportExcelSheet";
import ExistingMembers from "./components/management/ExistingMembers";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Login from "./components/profile/Login";
import Profile from "./components/profile/Profile";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const App = () => {
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };
  return (
    <div className="container">
      <Router>
        <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
        <Switch>
          <Route exact path="/">
            {user ? <Redirect to="/dashboard" /> : <Login />}
          </Route>
          <Route exact path="/dashboard">
            {user ? <Main /> : <Login />}
          </Route>
          <Route exact path="/importexcelsheet">
            {user ? <ImportExcelSheet /> : <Login />}
          </Route>
          <Route exact path="/sendmessages">
            {user ? <SendMessage /> : <Login />}
          </Route>
          <Route exact path="/existingmembers">
            {user ? <ExistingMembers /> : <Login />}
          </Route>
          <Route exact path="/adminprofile">
            {user ? <Profile /> : <Login />}
          </Route>
        </Switch>
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
      </Router>
    </div>
  );
};

export default App;
