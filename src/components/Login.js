// Import the React library and React hooks for state management
import React, { useState } from 'react';

// Import the CSS file for styling the Login component
import '../styles/login.css';

// Import the Link and useNavigate functions from react-router-dom
// Link is used for client-side navigation, and useNavigate enables programmatic navigation
import { Link, useNavigate } from 'react-router-dom';

// Import Firebase Authentication methods for signing in and registering users
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// Import the Firebase auth object for interacting with the Firebase Authentication service
import { auth } from '../firebase';

// Define the Login functional component
function Login() {
  // useNavigate hook allows redirection to different routes programmatically
  const navigate = useNavigate();

  // State to store the user's email, initialized as an empty string
  const [email, setEmail] = useState('');

  // State to store the user's password, initialized as an empty string
  const [password, setPassword] = useState('');

  // Function to handle user sign-in
  const signIn = (e) => {
    e.preventDefault(); // Prevent the default form submission (page reload)

    // Use the Firebase `signInWithEmailAndPassword` function to log the user in
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // If successful, navigate to the homepage
        navigate('/');
      })
      .catch((error) => alert(error.message)); // Display an error message if sign-in fails
  };

  // Function to handle user registration
  const register = (e) => {
    e.preventDefault(); // Prevent the default form submission (page reload)

    // Use the Firebase `createUserWithEmailAndPassword` function to register the user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // If successful, navigate to the homepage
        if (userCredential) {
          navigate('/');
        }
      })
      .catch((error) => alert(error.message)); // Display an error message if registration fails
  };

  // Return the JSX structure for the Login component
  return (
    <div className='login'>
      {/* Link to navigate back to the homepage */}
      <Link to='/'>
        <img
          className='login__logo' // CSS class for styling the logo
          src='TL_Logo.jpg' // Amazon logo image source
          alt='login-logo' // Alt text for accessibility and fallback in case the image fails to load
        />
      </Link>

      {/* Container for the login form and related elements */}
      <div className='login__container'>
        <h1>Sign-in</h1> {/* Form title */}

        {/* Form for the email and password inputs and the sign-in button */}
        <form>
          {/* Input field for the user's email */}
          <h5>E-mail</h5>
          <input
            type='text' // Text input type
            value={email} // Controlled input, value tied to the email state
            onChange={(e) => setEmail(e.target.value)} // Update state when the user types
          />

          {/* Input field for the user's password */}
          <h5>Password</h5>
          <input
            type='password' // Password input type to mask user input
            value={password} // Controlled input, value tied to the password state
            onChange={(e) => setPassword(e.target.value)} // Update state when the user types
          />

          {/* Button to sign in the user; triggers the signIn function on click */}
          <button
            type='submit' // Submit button type to allow form submission
            onClick={signIn} // Call the signIn function when clicked
            className='login__signInButton' // CSS class for styling
          >
            Sign In
          </button>
        </form>

        {/* Informational text about the terms and privacy policies */}
        <p>
          By signing-in you agree to the Travis Locke fake Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
        </p>

        {/* Button to create a new account; triggers the register function on click */}
        <button
          onClick={register} // Call the register function when clicked
          className='login__registerButton' // CSS class for styling
        >
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

// Export the Login component as the default export to enable importing it in other files
export default Login;
