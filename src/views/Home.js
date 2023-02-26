import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import CONSTANTS from '../constants';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import "../styles/Home.css";
import logo from '../images/logo.png';

const firebaseConfig = {
    apiKey: "AIzaSyCki6J5oxgPcsIEte8PmOFwk03qWpD86oM",
    authDomain: "cramberry-e25ce.firebaseapp.com",
    projectId: "cramberry-e25ce",
    storageBucket: "cramberry-e25ce.appspot.com",
    messagingSenderId: "443496549460",
    appId: "1:443496549460:web:e97a623b8e7a63bae231c1",
    measurementId: "G-HW6SCNT7K2"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();



const Home = () => {

    const [redirect, setRedirect] = useState(false);

    const handleGoogle = async () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log('we are in the then block');
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                fetch(`${CONSTANTS.API_ENDPOINT}${CONSTANTS.GOOGLE_AUTH}`, {
                    method: 'POST',
                    body: JSON.stringify({ idToken: result.user.uid, email: result.user.email }),
                    headers: { 'Content-Type': 'application/json' }
                })
                    //read the response and set the token
                    .then(async (response) => {
                        const data = await response.json();
                        if (response.ok) {
                            window.localStorage.setItem(CONSTANTS.TOKEN, data.token);
                            setRedirect(true);
                        }
                    })
            })
    };


    if (redirect) {
        return <Redirect to="/dashboard" />
    }

    return (
        <div className="Home">
            <div className="top-content-home">
                <div className="logoDiv">
                    <img src={logo} alt="logo" />
                    <h4>cramberry</h4>
                </div>
                <button className="login-btn" onClick={handleGoogle}>
                    Login
                </button>
                <button className="signup-with-google-btn" onClick={handleGoogle}>
                    Sign Up
                </button>
            </div>

        </div>
    );
}


export default Home;
