import Nav from '../Nav';
import Button from '@material-ui/core/Button';
import '../profile.css';
import app from '../firebase';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import EditProfile from './EditProfile';

import '../nav.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ForumIcon from '@material-ui/icons/Forum';
// import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
// import { Link } from "react-router-dom";

const Profile = () => {

    const history = useHistory();
    const [error, setError] = useState('');

    const [personalInfo, setPersonalInfo] = useState({})
    console.log(personalInfo)

    async function handleLogout() {

        try {
            await app.auth().signOut();
            history.push('/')
        } catch {
            setError('Failed to Log Out!')
        }
    }

    // const profPic = app.storage().ref().child(currentUser.uid)

    const { currentUser } = useAuth();

    useEffect( async () => {

        if (currentUser) {

            await app.firestore().collection('people').doc(currentUser.uid).get().then(doc => {
                setPersonalInfo(doc.data())
            })
        }

    }, [])

    return (<div>
        <div className="navi">

            <Link to="/profile"><IconButton ><AccountCircleIcon style={{color:"black"}} fontSize='medium' /></IconButton></Link>
            <Link to="/home"><IconButton><HomeIcon fontSize='medium' /></IconButton></Link>
            <Link to="/matches"><IconButton><WhatshotIcon fontSize='medium' /></IconButton></Link>
            {/* <Link to="/chats"><IconButton><ForumIcon fontSize='medium'/></IconButton></Link> */}

        </div>

        <div className="formContainer" style={{ display: 'flex', flexDirection: 'column' }}>

            <div style={{ position: 'absolute', top: '0px', width: '100%' }}>

                <div className="twoHolder" style={{ display: 'flex' }}>

                    <div className="editProf">
                        <div className="editInside" style={{ position: 'absolute' }}>
                            <Link to="/editprofile">
                                <IconButton style={{ boxShadow: "0px 0px 33px -6px rgba(0,0,0,0.75)", WebkitBoxShadow: "0px 0px 33px -6px rgba(0,0,0,0.75)", MozBoxShadow: "0px 0px 33px -6px rgba(0,0,0,0.75)" }}>
                                    <EditTwoToneIcon style={{ color: 'purple' }} fontSize="medium" />
                                </IconButton>
                                <h6 style={{ marginTop: '5px', color: '#727273', marginLeft: '10px' }}>edit</h6>
                            </Link>
                        </div>
                    </div>

                    <div className="profileAd" align="center" style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 0)' }}>
                        <div className="profilePicSet" style={{ backgroundImage: `url(${personalInfo.pic})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                    </div>

                    <div className="editProf">
                        <div className="editInsideAdd" style={{ position: 'absolute' }} >
                            <Link to="/editintrests">
                                <IconButton style={{ boxShadow: "0px 0px 33px -6px rgba(0,0,0,0.75)", WebkitBoxShadow: "0px 0px 33px -6px rgba(0,0,0,0.75)", MozBoxShadow: "0px 0px 33px -6px rgba(0,0,0,0.75)" }}>
                                    <AddIcon style={{ color: 'orange' }} fontSize="medium" />
                                </IconButton>
                                <h6 style={{ marginTop: '5px', color: '#727273', marginLeft: '10px' }}>add</h6>
                            </Link>
                        </div>
                    </div>

                </div>

            </div>

            <div align="center" className="profData" style={{ position: 'absolute', bottom: '0px' }}>
                <div className="dataInside">
                    <h2 style={{ marginTop: '7px' }}>{personalInfo.name}</h2>
                    <h5 style={{ color: '#727273' }} >{personalInfo.description}</h5>
                    <h2>{personalInfo.age}</h2>
                </div>
            </div>

        </div>

        <div className='profileSubmitButtonContainer'>
            <Button className="logoutButton" style={{ backgroundColor: 'black' }} onClick={handleLogout} variant="contained" color="primary">LogOut</Button>
        </div>


    </div>);
}

export default Profile;