import { useRef, useState } from "react";
import app from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useHistory } from "react-router-dom";
import '../signUpSignIn.css';
import { Link } from "react-router-dom";
import { provider } from '../firebase';

const SignIn = () => {

    const email = useRef();
    const password = useRef();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const history = useHistory();
    const { currentUser } = useAuth();

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

    function googleAuth() {
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

    return (<div className="frontContainer">
        <div className="inForm">
            <form>
                <h1 align="center" style={{ color: 'white', marginTop: '120px' }}>Sign-In</h1><br />
                <input type="email" style={{ marginTop: "40px" }} className='emailSpace' placeholder="Email" ref={email} /><br />
                <input type="password" id='passwordSpace' placeholder="Password" ref={password} /><br />
                <button className='confirmSubmit' onClick={handleSignIn} disabled={loading} type="submit" >LogIn</button>
                <h6 align="center" style={{ color: 'white' }} >Dosen't have an account <Link to="/signup">SignUp</Link></h6>
            </form>
            <div>
                <button onClick={googleAuth} style={{ width: '220px', height: '60px', borderRadius: '10px', border: 'none' }} >SignIn with Google</button>
            </div>
        </div>
    </div>
    );
}

export default SignIn;