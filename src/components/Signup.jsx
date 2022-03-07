import app from '../firebase';
import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthContext from '../context/AuthContext';
import { useHistory } from "react-router-dom";
import '../signUpSignIn.css';
import { Link } from "react-router-dom";
import { provider } from '../firebase';

const SignUp = () => {

    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory()

    async function handleSignUp(e) {
        e.preventDefault();

        if (password.current.value !== confirmPassword.current.value) {
            return setError("passwords dosen't match!")
        }
        try {
            setLoading(true);
            await app.auth().createUserWithEmailAndPassword(email.current.value, password.current.value).then(cred => {
                app.firestore().collection('people').doc(cred.user.uid).set({
                    age: NaN, currentCity: '', description: '', gender: '', name: '', pic: ''
                })
            })
            history.push('/personaldetails')
        } catch {
            setError("soory please try again!")
        }

        setLoading(false);

    }

    function googleAuth() {
        app.auth().signInWithPopup(provider).then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                var token = credential.accessToken;
                var user = result.user;
                
                app.firestore().collection('people').doc(result.user.uid).set({
                    age: NaN, currentCity: '', description: '', gender: '', name: '', pic: ''
                })
                app.firestore().collection('people').doc(result.user.uid).collection('moreDetails').set({
                    aboutDetails : '',
                    basicInfo : [],
                    intrests : []
                })
                history.push('/personaldetails')
            }).catch((error) => {
                console.log('this is an error')
            });
    }

    const { currentUser } = useAuth();

    return (<div className="frontContainer">
        <div className="inForm">

            <form>
                <h1 align="center" style={{ color: 'white', marginTop: '120px' }}>Sign-Up</h1><br />
                <input type="email" style={{ marginTop: "40px" }} className='emailSpace' ref={email} placeholder="Email" /><br />
                <input type="password" className='passwordSpace' ref={password} placeholder="Password" />
                <input type="password" className='confirmPasswordSpace' ref={confirmPassword} placeholder="Confirm Password" /><br />
                <button disabled={loading} className='confirmSubmit' type="submit" disabled={loading} onClick={handleSignUp}>Submit</button><br />
                <h6 align="center" style={{ color: 'white' }} >Already an user? <Link to="/signin">SignIn</Link></h6>
            </form>
            <div>
                <button onClick={googleAuth} style={{ width: '220px', height: '60px', borderRadius: '10px', border: 'none' }} >SignUp with Google</button>
            </div>
        </div>
    </div>);
}

export default SignUp;