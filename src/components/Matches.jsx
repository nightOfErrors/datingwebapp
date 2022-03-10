import React, { createContext, useEffect, useState } from 'react';
import Nav from '../Nav';
import app from '../firebase';
import '../matches.css'
import '../context/AuthContext';
import { useAuth } from '../context/AuthContext';
import Match from './Match';
import Chatss from './ChatsSt';
import ReactModal from 'react-modal';
import uuid from 'react-uuid';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";
import Chats from './Chats';
import CloseIcon from '@material-ui/icons/Close';

import '../nav.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ForumIcon from '@material-ui/icons/Forum';
// import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
// import { Link } from "react-router-dom";

ReactModal.setAppElement('#root')
const ProfileDataProvider = createContext();
const Matches = () => {

    const { currentUser } = useAuth();
    const [matches, setMatches] = useState([]);
    const [profile, setProfile] = useState({
        name: "",
        pic: "",
        description: "",
        age: NaN,
        key: ""
    });

    let longLastingChat = {
        text: '',
        time: ''
    }

    const [oldBackMessages, setOldBackMessages] = useState([]);

    useEffect(() => {

        app.firestore().collection('people').doc(currentUser.uid).collection('matches').onSnapshot(snapshot => {
            let matchName = snapshot.docs.map(doc => ({ name: doc.data().name, pic: doc.data().pic, description: doc.data().description, age: doc.data().age, key: doc.data().uid }))
            setMatches(matchName)
            // console.log(matches)
        })

        app.firestore().collection('people').doc(currentUser.uid).collection('chats').orderBy('timeSequence', 'desc').onSnapshot(snapshot => {

            let prevChats = snapshot.docs.map(doc => doc.id)
            // console.log(prevChats)
            setOldBackMessages(prevChats)
            // console.log(oldBackMessages)

        })


    }, [])


    const [modalIsOpen, setModalIsOpen] = useState(false);

    function profileClicked(point) {

        setModalIsOpen(true);

        for (let i = 0; i < matches.length; i++) {
            const element = matches[i];
            if (element.key == point) {
                // console.log(element)
                setProfile(element)
            }
        }
    }

    // function noMatch(){

    //     let valueRet = 'block'

    //     if(matches.length == 0){
    //         valueRet = 'none'
    //     }

    //     return valueRet

    // }

    let noMatch = 'none'
    if (matches.length == 0) {
        noMatch = 'block'
    }

    let noChat = 'none'
    if (oldBackMessages.length == 0) {
        noChat = 'block'
    }


    return (<div>

        <div className="navi">

            <Link to="/profile"><IconButton ><AccountCircleIcon fontSize='medium' /></IconButton></Link>
            <Link to="/home"><IconButton><HomeIcon fontSize='medium' /></IconButton></Link>
            <Link to="/matches"><IconButton><WhatshotIcon style={{color:"black"}} fontSize='medium' /></IconButton></Link>
            {/* <Link to="/chats"><IconButton><ForumIcon fontSize='medium'/></IconButton></Link> */}

        </div>

        <div className="topContainer" >

            <div className="matchesContent">
                <h4 style={{ marginTop: '25px', marginLeft: '20px' }} >matches</h4>
                <h6 style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 0)', marginTop: '17px', display: noMatch }}>Sorry you haven't got any match yet.</h6>

                <div className="matchContainer">
                    {matches.map(matchesGot => <Match name={matchesGot.name} pic={matchesGot.pic} age={matchesGot.age} storyProfileClicked={profileClicked} key={matchesGot.key} id={matchesGot.key} />)}
                </div>

                <ReactModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={
                    {
                        overlay: {
                            // position:'absolute',
                            width: '100%',
                        },
                        content: {
                            background: '#F8F9FA',
                            borderRadius: '15px',
                            maxWidth: '600px',
                            left: '50%',
                            width: '95%',
                            transform: 'translate(-50%, 0)',
                        }
                    }
                }>
                    <button onClick={() => setModalIsOpen(false)} style={{ position: 'absolute', top: '0px', right: '0px', border: 'none', backgroundColor: '#F8F9FA', borderRadius: '10px' }}><CloseIcon /></button>
                    <div className='profileOpened' style={{ width: '100%', height: '60%', maxWidth: '600px', backgroundImage: `url(${profile.pic})` }}>
                        <h2 style={{ color: 'white', padding: '5px' }}>{profile.age}</h2>
                        <Link to={{ pathname: "/chats", state: profile }}><button className="messageButton"><ChatBubbleIcon fontSize="medium" style={{ color: 'white' }}></ChatBubbleIcon></button></Link>
                    </div>

                    <div align="center" className='profileDetailsOpen'>
                        <h1>{profile.name}</h1>
                        <h5 style={{ color: '#727273' }}>{profile.description}</h5>

                    </div>

                </ReactModal>

                <div>
                    <h4 style={{ marginTop: '25px', marginLeft: '20px' }}>chats</h4>
                    <h6 style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 0)', marginTop: '55px', display: noChat }}>Sorry you haven't got any chat yet.</h6>
                    <div className="chatContainer">

                        {oldBackMessages.map(backMessages => <Chatss id={backMessages} key={backMessages} matches={matches} profile={profile} />)}

                    </div>
                </div>
            </div>

        </div>

    </div>);
}

export default Matches;
export { ProfileDataProvider }