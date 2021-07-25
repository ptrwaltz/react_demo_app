import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile";
import Dashboard from "./components/Dashboard/Dashboard";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home";
import { ethers } from "ethers";
import Settings from "./components/Settings/Setting";

/* Generate mnemonics - Install ether npm */
const generateMnemonics = () => {
    const wallet = ethers.Wallet.createRandom();
    const mnemonic = wallet.mnemonic.phrase;
    const address = wallet.address;
};

const App = () => {
  const [showUserRole, setShowUserRole] = useState(false);
  const [showAdminRole, setShowAdminRole] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowUserRole(true);
      setShowAdminRole(false);
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
      <div>
        {/* <button onClick={generateMnemonics}>generateMnemonics</button> */}
      <ToastContainer> </ToastContainer> 
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/home"} className="navbar-brand" style={{paddingLeft: "20px"}}>
            Bounce
          </Link>
        

          {currentUser ? (
            <div className="navbar-nav ml-auto">

            {showAdminRole && (
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
             </li>
            )}

              {showUserRole && (
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.data.userData.role}
                </Link>
              </li>
              )}
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  Sign Out
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Sign In
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                Sign Up
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/settings"} className="nav-link">
                Settings
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path={"/edit/:id"} component={EditProfile} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/settings" component={Settings} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;