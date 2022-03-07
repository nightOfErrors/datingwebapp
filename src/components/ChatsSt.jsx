import React, { useState } from 'react';
import '../matches.css';
import { Link } from "react-router-dom";
import app from '../firebase';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';


const Chatss = (props) => {

    const { currentUser } = useAuth();

    let gotTheThisOneData = {
        pic: '',
        name: '',
        description: '',
        key: '',
        age: ''
    };
    const nowTheMatches = props.matches

    for (let i = 0; i < nowTheMatches.length; i++) {
        const element = nowTheMatches[i];
        if (element.key == props.id) {
            gotTheThisOneData = element
            // console.log(element.key)

        }
    }

    let[theLastChatShown, setTheLastChatShown] = useState({
        text: '',
        time: ''
    })

    useEffect(()=>{

        for (let i = 0; i < nowTheMatches.length; i++) {
            const element = nowTheMatches[i];
            if (element.key == props.id) {
                
                app.firestore().collection('people').doc(currentUser.uid).collection('chats').doc(element.key).get().then(doc=>{
                    // console.log(doc.data())
                    setTheLastChatShown(doc.data())
                })    
            }
        }

    },[])

    // console.log(theLastChatShown)



    return (<div>
        <Link style={{ textDecoration: 'none' }} to={{ pathname: "/chats", state: gotTheThisOneData }}>
            <div className="chatColumn">

                <div className="profileChats" style={{ backgroundImage: `url(${gotTheThisOneData.pic})` }}></div>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <h5 className="profileNames" style={{ marginLeft: '15px', marginTop: '5px', color: '#484848' }}>{gotTheThisOneData.name}</h5>
                    <p style={{ color: '#808080', marginLeft:'15px', fontSize:'17px'}} >{theLastChatShown.text}</p>
                </div>
                <div style={{ position:'absolute', right:'5px'}}>
                    <b><p style={{ color: '#808080', marginTop:'8px', fontSize:'15px'}}>{theLastChatShown.createdTime}</p></b>
                </div>

            </div>
        </Link>
    </div>);
}

export default Chatss;