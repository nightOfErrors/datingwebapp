import React, { useState } from 'react';
import "../editintrests.css";
import "../nav.css"

import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import ReactModal from 'react-modal';

import Button from '@material-ui/core/Button';

import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import SmokingRoomsIcon from '@material-ui/icons/SmokingRooms';
import SchoolIcon from '@material-ui/icons/School';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useEffect } from 'react';

import { useHistory } from "react-router-dom";

import app from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useRef } from 'react';

const EditIntrests = () => {

    const { currentUser } = useAuth();
    const history = useHistory();

    const [basicInfo, setBasicInfo] = useState([])
    // const workoutRef = useRef()
    // const smokingRef = useRef()
    // const drinkingRef = useRef()
    // const collegeRef = useRef()

    const [intrests, setIntrests] = useState([])

    const [aboutDes, setAboutDes] = useState("")


    function workoutFunc(e) {
        // console.log(e.targrt.value)
    }



    function dataUpload() {

        // app.firestore().collection('people').doc(currentUser.uid).collection('moreDetails').set({
        //     aboutDetails : '',
        //     basicInfo : [],
        //     intrests : []
        // })
        // history.push('/profile')
        console.log("This page is not READY yet!")

    }


    return (<div>

        <div className="navi">

            <Link to="/profile"><IconButton><ArrowBackIcon fontSize='medium' /></IconButton></Link>
            <Link to="/home"><IconButton><HomeIcon fontSize='medium' /></IconButton></Link>
            <Link to="/matches"><IconButton><WhatshotIcon fontSize='medium' /></IconButton></Link>
            {/* <Link to="/chats"><IconButton><ForumIcon fontSize='medium'/></IconButton></Link> */}

        </div>

        <div className="formalContainer">
            <div className="infoForm">

                <div className="formDatas">
                    <h5>Add Basic Info :</h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '15px' }}>
                        <div style={{ display: 'flex', height: '35px', backgroundColor: '#A671D8', padding: '5px', borderRadius: '14px', marginTop: '10px', marginLeft: '10px' }} >
                            <FitnessCenterIcon style={{ width: '17px', color: 'white' }} />
                            <p style={{ font: '5px', marginLeft: '10px' }}>workout</p>
                            <input onChange={workoutFunc} style={{ marginTop: '7px', marginLeft: '22px', marginRight: '7px' }} type="checkbox"></input>
                        </div>

                        <div style={{ display: 'flex', height: '35px', backgroundColor: '#A671D8', padding: '5px', borderRadius: '14px', marginLeft: '10px', marginTop: '10px' }}>
                            <LocalBarIcon style={{ width: '17px', color: 'white' }} />
                            <p style={{ font: '5px', marginLeft: '10px' }}>drink</p>
                            <input style={{ marginTop: '7px', marginLeft: '22px', marginRight: '7px', border: '2px solid black' }} type="checkbox"></input>
                        </div>

                        <div style={{ display: 'flex', height: '35px', backgroundColor: '#A671D8', padding: '5px', borderRadius: '14px', marginLeft: '10px', marginTop: '10px' }}>
                            <SmokingRoomsIcon style={{ width: '17px', color: 'white' }} />
                            <p style={{ font: '5px', marginLeft: '10px' }}>smoke</p>
                            <input style={{ marginTop: '7px', marginLeft: '22px', marginRight: '7px' }} type="checkbox"></input>
                        </div>

                        <div style={{ display: 'flex', height: '35px', backgroundColor: '#A671D8', padding: '5px', borderRadius: '14px', marginLeft: '10px', marginTop: '10px' }}>
                            <SchoolIcon style={{ width: '17px', color: 'white' }} />
                            <p style={{ font: '5px', marginLeft: '10px' }}>college</p>
                            <input style={{ marginTop: '7px', marginLeft: '22px', marginRight: '7px' }} type="checkbox"></input>
                        </div>

                    </div>
                </div>

                <ReactModal isOpen={true} style={
                    {
                        overlay: {
                            width: '100%',
                            // width: '100%',
                            backgroundColor: 'black',
                            opacity: '0.85'

                        },
                        content: {
                            background: '#FFF3CD',
                            borderRadius: '7px',
                            maxWidth: '700px',
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                            width: '100%',
                            height: '75px',
                            marginTop: '300px',
                            border: '1px solid #856445',
                            // opacity:'2'

                        }
                    }
                }>
                    {/* <button onClick={() => setErrorsModalIsOpen(false)} style={{ position: 'absolute', top: '0px', right: '0px', border: 'none', backgroundColor: '#F8F9FA' }}><CloseIcon /></button>
                        <h5 style={{ color: '#856445' }}>{errors}</h5> */}
                        <b><p style={{fontSize:'17px'}}>This Section Is Under Developement, Please Return.</p></b>

                </ReactModal>

                <div className="formDatas" style={{ marginTop: '10px' }}>
                    <h5>Add Your Intrests :</h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '15px' }}>

                        <input className="inputIntrests" placeholder="add intrest" style={{ color: '#A671D8', backgroundColor: '#DBDBDB', height: '40px', width: '115px', marginTop: '5px', marginLeft: '10px', border: '2px solid #A671D8', borderRadius: '5px' }}></input>

                        <input className="inputIntrests" placeholder="add intrest" style={{ color: '#A671D8', backgroundColor: '#DBDBDB', height: '40px', width: '115px', marginTop: '5px', marginLeft: '10px', border: '2px solid #A671D8', borderRadius: '5px' }}></input>

                        <input className="inputIntrests" placeholder="add intrest" style={{ color: '#A671D8', backgroundColor: '#DBDBDB', height: '40px', width: '115px', marginTop: '5px', marginLeft: '10px', border: '2px solid #A671D8', borderRadius: '5px' }}></input>

                        <input className="inputIntrests" placeholder="add intrest" style={{ color: '#A671D8', backgroundColor: '#DBDBDB', height: '40px', width: '115px', marginTop: '5px', marginLeft: '10px', border: '2px solid #A671D8', borderRadius: '5px' }}></input>

                    </div>
                </div>


                <div className="formDatas">
                    <h5>Something About You :</h5>
                    <div class="form-group">
                        {/* <label for="exampleInputEmail1">Email address</label> */}
                        <input style={{ height: '120px' }} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="About you" />
                        <small id="emailHelp" class="form-text text-muted">Write something you want to share.</small>
                    </div>

                </div>

            </div>
        </div>

        <div className='profileSubmitingButtonContainer'>
            <Button onClick={dataUpload} type="submit" style={{ backgroundColor: 'black' }} className="submitingButton" variant="contained" color="primary">Update</Button>
        </div>

    </div >);
}

export default EditIntrests;