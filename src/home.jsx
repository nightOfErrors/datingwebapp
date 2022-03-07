import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './Card';
// import Funkbar from './fuctions';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import uuid from 'react-uuid';
import Nav from './Nav';
import app from './firebase';
import Chats from './components/Chats';
import Profile from './components/Profile';
import FirstPage from './components/FirstPage';
import SignUp from './components/Signup';
import SignIn from './components/SignIn';
import AuthProvider from './context/AuthContext';
import AuthContext from './context/AuthContext';
import ProfileForm from './components/ProfieForm';
import PrivateRoute from './context/privateRouting';
import { useAuth } from './context/AuthContext';

const Home = () => {

    const { currentUser } = useAuth();

    const [profile, setProfiles] = useState([])
    const [leftSwipedUsers, setLeftSwipedUsers] = useState([]);
    const [rightSwipedUsers, setRightSwipedUsers] = useState([]);

    const [toRefresh, setToRefresh] = useState(0)
    
    function refreshAct(){
        setToRefresh(toRefresh + 1)
        console.log(toRefresh)
    }

    useEffect(() => {

        let allProfs = [];
        app.firestore().collection('people').onSnapshot(snapshot => {
            const snap = snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }))
            setProfiles(snap);
        })

        app.firestore().collection('people').doc(currentUser.uid).collection('leftBucket').onSnapshot(snapshot => {
            let newLeftSwiped = snapshot.docs.map(doc => doc.data().uid)
            setLeftSwipedUsers(newLeftSwiped)
        })

        app.firestore().collection('people').doc(currentUser.uid).collection('rightBucket').onSnapshot(snapshot => {
            let newRightSwiped = snapshot.docs.map(doc => doc.data().uid)
            setRightSwipedUsers(newRightSwiped)
        })

    }, [toRefresh]);

    // console.log(currentUser)

    return (<div>
        <Nav />
        <div className="cardsContainer">
            {profile.map(profData => <Card name={profData.data.name}
                refresh={refreshAct}
                pic={profData.data.pic}
                description={profData.data.description}
                age={profData.data.age}
                id={profData.id}
                leftSwiped={leftSwipedUsers}
                rightSwiped={rightSwipedUsers}
                key={profData.id} />)}
        </div>
        {/* <Funkbar leftButtonOn={leftButtonOnIt} refresh={refreshAct} /> */}
    </div>);
}

export default Home;