import Nav from '../Nav';
import '../chats.css';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";
import SendIcon from '@material-ui/icons/Send';
import Chat from './Chat';
import { ProfileDataProvider } from './Matches';
import { useContext, useRef, useState } from 'react';
import app from '../firebase';
// import profile from './Matches';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import uuid from 'react-uuid'
import { date } from 'date-fns/locale/af';
// import ScrollableFeed from 'react-scrollable-feed'


const Chats = (props) => {

    const { currentUser } = useAuth();
    const [allTheChats, setAllTheChats] = useState([]);
    const typedText = useRef()

    const { state } = props.location
    // console.log(props)

    const uid = currentUser.uid;


    useEffect(()=>{

        app.firestore().collection('people').doc(currentUser.uid).collection('chats').doc(state.key).collection('chat').orderBy('timeSequence').onSnapshot( snapshot =>{

            const chat =  snapshot.docs.map(doc=> doc.data())
            setAllTheChats(chat)
            // console.log(allTheChats)

        })

    },[])


    function chatUpload(e) {

        var now = new Date()
        var ampm = now.getHours() >= 12 ? 'pm' : 'am'
        var time = now.getHours() + ':' + now.getMinutes() + ampm

        e.preventDefault();
        let gotText = typedText.current.value;
        // console.log(gotText);
        app.firestore().collection('people').doc(currentUser.uid).collection('chats').doc(state.key).collection('chat').add({
            
            text: gotText,
            key: uuid(),
            createdTime: time,
            timeSequence : new Date().getTime(), 
            uid

        })

        app.firestore().collection('people').doc(currentUser.uid).collection('chats').doc(state.key).set({
            uid,
            text: gotText,
            createdTime: time,
            timeSequence : new Date().getTime(), 
        })


        app.firestore().collection('people').doc(state.key).collection('chats').doc(currentUser.uid).collection('chat').add({
            
            text: gotText,
            key: uuid(),
            createdTime: time,
            timeSequence : new Date().getTime(), 
            uid

        })

        app.firestore().collection('people').doc(state.key).collection('chats').doc(currentUser.uid).set({
            uid,
            text: gotText,
            createdTime: time,
            timeSequence : new Date().getTime(), 
        })

        typedText.current.value = '';

    }


    return (<div>

        <div className="containerChats">

            <div className="chatsNav">
                <Link to="/matches"><KeyboardBackspaceIcon style={{ marginTop: '7px', left: '15px', color: 'black' }}></KeyboardBackspaceIcon></Link>
                <div className="chatsProfilePic" style={{ backgroundImage: `url(${state.pic})` }}></div>
                <h6 style={{ marginTop: '9px' }}>{state.name}</h6>
            </div>

            <div className="theChats">
        
                {allTheChats.map(singleChat => <Chat text={singleChat.text} time={singleChat.createdTime} id={singleChat.uid} key={singleChat.key}  />)}
      
            </div>

            <div className="chatInput">
                <form type="submit">
                    <input ref={typedText} placeholder="Message..." className="messageInput"></input>
                    <button style={{ border:'none', backgroundColor:'transparent' }} onClick={chatUpload}>
                        <SendIcon type="button" style={{ color: "#F5F5F5" }}></SendIcon>
                    </button>
                </form>
            </div>

        </div>


    </div>);
}

export default Chats;