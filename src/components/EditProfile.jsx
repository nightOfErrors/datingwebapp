import '../editProfile.css'
import '../nav.css'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ForumIcon from '@material-ui/icons/Forum';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import { Link } from "react-router-dom";

import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Nav from '../Nav';
import '../profileform.css';
import Button from '@material-ui/core/Button';
import { useAuth } from '../context/AuthContext';
import app from '../firebase';
import '../bgi.jpg';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import WcIcon from '@material-ui/icons/Wc';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

import LocationCityIcon from '@material-ui/icons/LocationCity';
import AddIcon from '@material-ui/icons/Add';
import { Description } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';

import InfoIcon from '@material-ui/icons/Info';
import ReactModal from 'react-modal';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import IconButton from '@material-ui/core/IconButton';

const EditProfile = () => {


    const { currentUser } = useAuth();
    const history = useHistory();

    const [file, setFile] = useState(null);

    const [gotUserdata, setGotUserData] = useState({
        name: "",
        age: "",
        description: "",
        gender: "",
        pic: ""
    });


    // useEffect(() => {
    //     app.firestore().collection('people').doc(currentUser.uid).onSnapshot(snapshot => {
    //         setGotUserData(snapshot.data())
    //     })
    // }, [])

    // let picOption = "Change"
    // if (gotUserdata.pic == "") {
    //     picOption = "Add"
    // }
    // console.log(gotUserdata)


    const getPic = useRef();
    function handleUpPic(e) {
        getPic.current.click()
    }

    function oriUpPic(e) {

        if (e.target.files[0]) {
            setFile(e.target.files[0])
        }

    }

    // console.log(file.name)

    const [fileName, setFileName] = useState("Add Profile")

    useEffect(() => {
        if (file !== null) {
            setFileName(file.name)
            // console.log(file.name)
        }
    }, [file])

    // console.log(fileName)

    const [errors, setErrors] = useState('')
    const [ErrorsModalIsOpen, setErrorsModalIsOpen] = useState(false);


    const [about, setAbout] = useState('')
    function handleAbout(e) {
        setAbout(e.target.value)
    }

    const [displayName, setDisplayName] = useState('');
    function handleDisplayName(e) {
        setDisplayName(e.target.value)
    }

    const [currentLocation, setCurrentLocation] = useState('');
    function handleCurrentLocation(e) {
        setCurrentLocation(e.target.value)
    }

    const [picUrl, setPicUrl] = useState('https://source.unsplash.com/1600x900/?nature,water')

    function handleSubmit(e) {

        e.preventDefault();

        if (currentLocation == '' || about == '' || displayName == '') {

            setErrors("Please fill all the details of the form.")
            console.log(errors)
            setErrorsModalIsOpen(true)
        }
        else {
            
            let uploadTask = app.storage().ref('users/' + currentUser.uid + '/profile.jpg');
            uploadTask.put(file).on("state_changed", (snapshot) => {

            },
                (error) => {
                    console.log(error);
                },
                async () => {
                    const url = await uploadTask.getDownloadURL();
                    // console.log(url)
                    setPicUrl(url)
                    // console.log(picUrl)
                } 
            )
            // console.log(picUrl)
            app.firestore().collection('people').doc(currentUser.uid).set({
                currentCity: currentLocation, description: about, pic: picUrl, name: displayName
            }, { merge: true });


            history.push('/profile');
        }

    }




    return (<div>

        <div className="navi">

            <Link to="/profile"><IconButton><ArrowBackIcon fontSize='medium' /></IconButton></Link>
            <Link to="/home"><IconButton><HomeIcon fontSize='medium' /></IconButton></Link>
            <Link to="/matches"><IconButton><WhatshotIcon fontSize='medium' /></IconButton></Link>
            {/* <Link to="/chats"><IconButton><ForumIcon fontSize='medium'/></IconButton></Link> */}

        </div>
        {/* <div className="buttonDiv"><IconButton className='backbutton'><ArrowBackIcon /></IconButton></div> */}
        <form>
            <div className="formContainer">
                <div className="inForm">
                    {/* ref={getPic} */}
                    <div className="profilePicUpload" align="center">
                        <input ref={getPic} style={{ display: 'none' }} onChange={oriUpPic} id="addProfBut" type="file" />
                        <label for="addProfBut" className="addProfBut"><AddIcon style={{ marginTop: '11px' }} /></label>
                        <h5 style={{ color: 'white' }}>{/* {picOption} */}{fileName}</h5>
                    </div>

                    <div className="formItem">
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <AccountCircle />
                            </Grid>
                            <Grid item>
                                <TextField onChange={handleDisplayName} id="input-with-icon-grid" label="Full Name" />
                            </Grid>
                        </Grid>
                    </div>

                    {/* ALERT */}


                    <ReactModal isOpen={ErrorsModalIsOpen} onRequestClose={() => setErrorsModalIsOpen(false)} style={
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
                        <button onClick={() => setErrorsModalIsOpen(false)} style={{ position: 'absolute', top: '0px', right: '0px', border: 'none', backgroundColor: '#F8F9FA' }}><CloseIcon /></button>
                        <h5 style={{ color: '#856445' }}>{errors}</h5>

                    </ReactModal>


                    {/* ALERT */}

                    <div className="formItem">
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <LocationCityIcon />
                            </Grid>
                            <Grid item>
                                <TextField id="input-with-icon-grid" onChange={handleCurrentLocation} label="Current Location" />
                            </Grid>
                        </Grid>
                    </div>


                    <div className="formItem" id="aboutYou" align="center" >
                        <input id="aboutYouInput" maxLength="50" onChange={handleAbout} class="form-control" type="text" placeholder="Describe yourself in a line" aria-label="readonly input example" readonly></input>
                    </div>


                    <br />
                    <h6 style={{ color: '#727273' }}>{currentUser && currentUser.email}</h6>



                </div>
            </div>

            <div className='profileSubmitButtonContainer'>
                <Button type="submit" style={{ backgroundColor: 'black' }} onClick={handleSubmit} className="submitButton" variant="contained" color="primary">Update</Button>
            </div>

        </form>

    </div>);
}

export default EditProfile;