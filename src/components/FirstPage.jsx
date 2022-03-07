import '../FirstPage.css';
import SignUp from '../components/Signup';
// import { Link } from "react-router-dom";
import '../bgi.jpg'
import '../googlelogo.png'

import app from '../firebase';
import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthContext from '../context/AuthContext';
import { useHistory } from "react-router-dom";
import '../signUpSignIn.css';
import { Link } from "react-router-dom";
import { provider } from '../firebase';
import ReactModal from 'react-modal';

// import { useRef, useState } from "react";
// import app from '../firebase';
// import { useAuth } from '../context/AuthContext';
// import { useHistory } from "react-router-dom";
import '../signUpSignIn.css';
import CloseIcon from '@material-ui/icons/Close';
// import { Link } from "react-router-dom";
// import { provider } from '../firebase';



const FirstPage = () => {

    const [SignUpModalIsOpen, setSignUpModalIsOpen] = useState(false);
    function handleModalSignUp() {
        setSignUpModalIsOpen(true)
    }

    const [SignInModalIsOpen, setSignInModalIsOpen] = useState(false);
    function handleModalSignIn() {
        setSignInModalIsOpen(true)
    }

    const emailSignup = useRef();
    const passwordSignup = useRef();
    const confirmPasswordSignup = useRef();
    const [error, setError] = useState('');
    const [loadingSignUp, setLoadingSignUp] = useState(false);
    const history = useHistory()

    async function handleSignUp(e) {


        e.preventDefault();

        if (passwordSignup.current.value !== confirmPasswordSignup.current.value) {
            return setError("passwords dosen't match!")
        }
        try {
            setLoadingSignUp(true);
            await app.auth().createUserWithEmailAndPassword(emailSignup.current.value, passwordSignup.current.value).then(cred => {
                app.firestore().collection('people').doc(cred.user.uid).set({
                    age: NaN, currentCity: '', description: '', gender: '', name: '', pic: ''
                })
            })
            history.push('/personaldetails')
        } catch {
            setError("soory please try again!")
        }

        setLoadingSignUp(false);


    }

    function googleSignUpAuth() {
        app.auth().signInWithPopup(provider).then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;

            app.firestore().collection('people').doc(result.user.uid).set({
                age: NaN, currentCity: '', description: '', gender: '', name: '', pic: ''
            })
            history.push('/personaldetails')
        }).catch((error) => {
            console.log('this is an error')
        });
    }


    const email = useRef();
    const password = useRef();

    // const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignIn(e) {

        e.preventDefault();

        try {
            setLoading(true);
            await app.auth().signInWithEmailAndPassword(email.current.value, password.current.value);
            history.push('/profile');
        } catch {
            setError("please try again!")
        }

        setLoading(false);

    }

    function googleSignInAuth() {
        app.auth().signInWithPopup(provider).then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;

            history.push('/profile');
        }).catch((error) => {
            console.log('this is an error')
        });
    }

    return (
        <div id="frontContainer">
            <h3 style={{ marginLeft: '20px', color: 'white' }}>About</h3>
            <div id="contentCentered">
                <ReactModal isOpen={SignUpModalIsOpen} onRequestClose={() => setSignUpModalIsOpen(false)} style={
                    {
                        overlay: {
                            width: '100%',
                            // background: 'black',
                            // opacity: '0.7'

                        },
                        content: {
                            background: '#F8F9FA',
                            borderRadius: '15px',
                            maxWidth: '450px',
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                            width: '100%'

                        }
                    }
                }>

                    <div align='center'>
                        <button onClick={() => setSignUpModalIsOpen(false)} style={{ position: 'absolute', top: '0px', right: '0px', border: 'none', backgroundColor: '#F8F9FA' }}><CloseIcon /></button>
                        <b><p style={{ fontFamily: 'inherit', marginTop: '75px', fontSize: '27px', color: 'purple' }}>CREATE ACCOUNT</p></b>
                        <div style={{ marginTop: '60px' }}>
                            <div>
                                <form>
                                    <input ref={emailSignup} type="email" style={{ width: '100%', height: '40px', borderRadius: '15px 15px 0px 0px', border: 'none' }} placeholder="Enter Email"></input><br />
                                    <input type="password" ref={passwordSignup} style={{ width: '100%', height: '40px', border: 'none' }} placeholder="Enter Password"></input><br />
                                    <input type="password" ref={confirmPasswordSignup} style={{ width: '100%', height: '40px', border: 'none' }} placeholder="Confirm Password"></input><br />
                                    <button disabled={loadingSignUp} onClick={handleSignUp} style={{ width: '100%', height: '40px', borderRadius: '0px 0px 15px 15px', border: 'none', color: 'white', backgroundColor: 'black' }}>CREATE ACCOUNT</button>
                                </form>
                            </div>
                            <div style={{ marginTop: '15px' }}>
                                <b><h5>OR</h5></b>
                            </div>
                            <div>
                                <button onClick={googleSignUpAuth} className="signUpGoogle" style={{ width: '100%', height: '60px', marginTop: '10px' }}><div style={{ display: 'flex' }}><div className="googleImage" style={{ height: '40px', width: '40px', marginLeft: '10px' }}></div><b style={{ color: '#8B949F', marginTop: '5px', marginLeft: '8%' }}>Create Account With Google</b></div></button>
                            </div>
                        </div>
                    </div>

                </ReactModal>

                <ReactModal isOpen={SignInModalIsOpen} onRequestClose={() => setSignInModalIsOpen(false)} style={
                    {
                        overlay: {
                            width: '100%',
                            // width: '100%',
                            // color: 'black',

                        },
                        content: {
                            background: '#F8F9FA',
                            borderRadius: '15px',
                            maxWidth: '450px',
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                            width: '100%'

                        }
                    }
                }>

                    <div align='center'>
                        <button onClick={() => setSignInModalIsOpen(false)} style={{ position: 'absolute', top: '0px', right: '0px', border: 'none', backgroundColor: '#F8F9FA' }}><CloseIcon /></button>
                        <b><p style={{ fontFamily: 'inherit', marginTop: '75px', fontSize: '27px', color: 'purple' }}>SIGN IN</p></b>
                        <div style={{ marginTop: '60px' }}>
                            <div>
                                <form>
                                    <input ref={email} type="email" style={{ width: '100%', height: '40px', borderRadius: '15px 15px 0px 0px', border: 'none' }} placeholder="Enter Email"></input><br />
                                    <input type="password" ref={password} style={{ width: '100%', height: '40px', border: 'none' }} placeholder="Enter Password"></input><br />
                                    <button disabled={loading} onClick={handleSignIn} style={{ width: '100%', height: '40px', borderRadius: '0px 0px 15px 15px', border: 'none', color: 'white', backgroundColor: 'black' }}>SIGN IN</button>
                                </form>
                            </div>
                            <div style={{ marginTop: '15px' }}>
                                <b><h5>OR</h5></b>
                            </div>
                            <div>
                                <button onClick={googleSignInAuth} className="signUpGoogle" style={{ width: '100%', height: '60px', marginTop: '10px' }}><div style={{ display: 'flex' }}><div className="googleImage" style={{ height: '40px', width: '40px', marginLeft: '10px' }}></div><b style={{ color: '#8B949F', marginTop: '5px', marginLeft: '9%' }}>Login With Google Account</b></div></button>
                            </div>
                        </div>
                    </div>

                </ReactModal>

                <p style={{ color: 'white' }} className="frontText"><b>Meet Someone Fun.</b></p>
                <div style={{ marginTop: '10px' }} align="center" >
                    <button onClick={handleModalSignIn} className="signInBut"><b>SIGN IN</b></button>
                    <button onClick={handleModalSignUp} className="signUpBut"><b>CREATE ACCOUNT</b></button>
                </div>
            </div>
            <div className='bottomBar' style={{ position: 'absolute', width: '90%', height: '60px', backgroundColor: 'black', bottom: '0px' }}>

            </div>
        </div>
    )
}

export default FirstPage;