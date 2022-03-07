import React, { useEffect, useState } from 'react';
import app from '../firebase';
import { Link } from "react-router-dom";
import '../match.css'
import '../context/AuthContext';
import { useAuth } from '../context/AuthContext';

const Match = (props) => {

    const { currentUser } = useAuth();

    return (<div onClick={()=> props.storyProfileClicked(props.id)} >
        <div className="match" style={{ backgroundImage:`url(${props.pic})` }} >
            {/* <h7>{props.age}</h7> */}
        </div>
    </div>);
}

export default Match;