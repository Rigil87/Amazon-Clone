import React, { useState } from 'react';
import '../styles/login.css'
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (event) => {
        event.preventDefault(); // Prevent the form from refreshing the page

        auth.signInWithEmailAndPassword(email, password)
            .then((auth) => {
                console.log("User signed in:", auth);
                // Redirect the user to the home page or another page
                window.location.href = '/';
            })
            .catch((error) => {
                console.error("Error signing in:", error.message);
                alert(error.message); // Display error to the user
            });
    };

    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
                    alt='login_logo'
                />
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form onSubmit={signIn}>
                    <h5>E-mail</h5>
                    <input
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <h5>Password</h5>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type='submit' className='login__signInButton'>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button className='login__registerButton'>Create your Amazon Account</button>
            </div>
        </div>
    );
}

export default Login;