import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './Card';
import Funkbar from './fuctions';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import uuid from 'react-uuid';
import Nav from './Nav';
import app from './firebase';
import Chats from './components/Chats';
import Matches from './components/Matches';
import Profile from './components/Profile';
import FirstPage from './components/FirstPage';
// import SignUp from './components/Signup';
// import SignIn from './components/SignIn';
import AuthProvider from './context/AuthContext';
import AuthContext from './context/AuthContext';
import ProfileForm from './components/ProfieForm';
import PrivateRoute from './context/privateRouting';
import Home from './home'
import EditProfile from './components/EditProfile';
import EditIntrests from './components/EditIntrests'
// import { useAuth } from './context/AuthContext'; 

function App() {

  return (

    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            {/* <PrivateRoute exact path="/" component={Profile, Chats, ProfileForm}> */}
            <Route exact path="/" component={FirstPage} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/chats" component={Chats} />
            <Route exact path="/matches" component={Matches} />
            {/* <Route exact path="/signup" component={SignUp} /> */}
            {/* <Route exact path="/signin" component={SignIn} /> */}
            <Route exact path="/personaldetails" component={ProfileForm} />
            <Route exact path="/editintrests" component={EditIntrests} />
            <Route exact path="/editprofile" component={EditProfile} />
            <Route exact path="/home" component={Home} />
            {/* </PrivateRoute> */}
          </Switch>
        </Router>
      </AuthProvider>
    </div>

  );
}

export default App;


// navbar
      // profile
      // icon
      // messages
// card
// buttons
