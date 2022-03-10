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

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const ProfileForm = () => {

    // const dispalyName = useRef();
    // const currentLocation = useRef();
    // const description = useRef();

    // console.log(dispalyName.current.value);
    // console.log(currentLocation.current.value);
    // console.log(description.current.value);

    const { currentUser } = useAuth();
    const history = useHistory();

    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const [file, setFile] = useState(null);

    const getPic = useRef();
    function handleUpPic(e) {
        getPic.current.click()
    }

    function oriUpPic(e) {

        if (e.target.files[0]) {
            setFile(e.target.files[0])
        }

    }

    const [fileName, setFileName] = useState("Add Profile")

    useEffect(() => {
        if (file !== null) {
            setFileName(file.name)
            // console.log(file.name)
        }
    }, [file])

    const [errors, setErrors] = useState('')
    const [ErrorsModalIsOpen, setErrorsModalIsOpen] = useState(false);



    const [instaDate, setInstaDate] = useState();



    const handleDateChange = (date) => {

        let today = new Date();
        let birthDate = new Date(date);
        // console.log(date)
        setInstaDate(birthDate)

        // setSelectedDate(birthDate)

        // console.log(today.getFullYear())
        // console.log(birthDate.getFullYear())

        if (birthDate.getFullYear() == today.getFullYear()) {
            setSelectedDate(1)
        }
        else {
            let age = today.getFullYear() - birthDate.getFullYear();
            let m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            setSelectedDate(age);
        }

    };

    const classes = useStyles();
    const [state, setState] = React.useState('');

    const handleChange = (event) => {
        const gender = event.target.gender;
        setState(event.target.value);
    };

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

    const [picUrl, setPicUrl] = useState('')

    let picUpdate = ""

    function handleSubmit(e) {

        e.preventDefault();

        if (selectedDate == '' || currentLocation == '' || about == '' || state == '' || displayName == '') {
            setErrors("Please fill all the details of the form.")

            // console.log(selectedDate)
            // console.log(currentLocation)
            // console.log(about)
            // console.log(state)
            // console.log(displayName)

            console.log(errors)
            setErrorsModalIsOpen(true)
        }
        else if (selectedDate < 6) {
            setErrors("Please make sure you must be older than 6.")
            console.log(errors)
            setErrorsModalIsOpen(true)
        }
        else {
            let uploadTask = app.storage().ref('users/' + currentUser.uid + '/profile.jpg');
            uploadTask.put(file).on("state_changed", snapshot => { },
                error => {
                    console.log(error);
                },
                async () => {
                    await app.storage().ref("users").child(currentUser.uid).child("/profile.jpg").getDownloadURL().then(url => {
                        // console.log(url)
                        // setPicUrl(url)
                        picUpdate = url
                        // console.log(picUpdate)
                    })
                }
            )
            app.firestore().collection('people').doc(currentUser.uid).set({
                age: selectedDate, pic: picUpdate, currentCity: currentLocation, description: about, gender: state, name: displayName
            }, { merge: true });


            history.push('/profile');
        }

    }

    // API


    // API



    return (<div>

        {/* <Nav /> */}
        <form>

            <div className="formContainer">
                <div className="inForm">

                    <div className="profilePicUpload" align="center">
                        <input ref={getPic} onClick={oriUpPic} className="chooseFileBut" style={{ display: "none" }} type="file" />
                        <button onClick={handleUpPic} className="addProfBut"><AddIcon /></button>
                        <h5 style={{ color: 'white' }}>Add Profile</h5>
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


                    <div className="formItem">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Date Of Birth"
                                    value={instaDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </div>


                    <div className="formItem">
                        <FormControl required className={classes.formControl}>
                            <InputLabel>Your Gender</InputLabel>
                            <Select onChange={handleChange}>
                                <option aria-label="None" value="" />
                                <option value={'Male'}>Male</option>
                                <option value={'Female'}>Female</option>
                                <option value={'Other'}>Other</option>
                            </Select>
                        </FormControl>
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


    </div >)
}

export default ProfileForm;