// Import the necessary React library and other required modules
import React, { useState } from 'react';
import '../styles/login.css'; // Import the CSS file for styling the component
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom for navigation
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Auth methods
import { auth } from '../firebase'; // Import auth from firebase.js

// Define the Login functional component
function Login() {
  const navigate = useNavigate(); // Initialize the useNavigate hook for navigation
  const [email, setEmail] = useState(''); // Initialize the email state
  const [password, setPassword] = useState(''); // Initialize the password state

  // Define the function to handle user sign-in
  const signIn = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    signInWithEmailAndPassword(auth, email, password) // Sign in the user with email and password
      .then((userCredential) => {
        navigate('/'); // Redirect to the homepage after successful sign-in
      })
      .catch((error) => alert(error.message)); // Display an alert with the error message if sign-in fails
  };

  // Define the function to handle user registration
  const register = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    createUserWithEmailAndPassword(auth, email, password) // Create a new user with email and password
      .then((userCredential) => {
        if (userCredential) {
          navigate('/'); // Redirect to the homepage after successful registration
        }
      })
      .catch((error) => alert(error.message)); // Display an alert with the error message if registration fails
  };

  // Return the JSX structure for the Login component
  return (
    <div className='login'>
      <Link to='/'>
        <img
          className='login__logo'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
          alt='login-logo'
        />
      </Link>

      <div className='login__container'>
        <h1>Sign-in</h1>

        <form>
          {/* Input field for the user's email */}
          <h5>E-mail</h5>
          <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />

          {/* Input field for the user's password */}
          <h5>Password</h5>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

          {/* Button to trigger the sign-in function */}
          <button type='submit' onClick={signIn} className='login__signInButton'>
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
        </p>

        {/* Button to trigger the register function */}
        <button onClick={register} className='login__registerButton'>
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

// Export the Login component as the default export
export default Login;
