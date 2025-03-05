// Import the necessary React library and other required modules
import React from 'react';
import '../styles/header.css'; // Import the CSS file for styling the component
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom for navigation
import { useStateValue } from '../StateProvider'; // Import the useStateValue hook for accessing the global state
import { auth } from '../firebase'; // Import auth from firebase.js

// Define the Header functional component
function Header() {
  // Retrieve the basket and user from the global state using the useStateValue hook
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate(); // Initialize the useNavigate hook for navigation

  // Define the function to handle user authentication
  const handleAuth = () => {
    if (user) {
      auth.signOut(); // Sign out the user if they are logged in
      navigate('/login'); // Redirect to the login page after sign out
    }
  };

  // Return the JSX structure for the Header component
  return (
    <div className="header">
      {/* Navigation link to the homepage */}
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="header-logo"
        />
      </Link>

      <div className="header__search">
        {/* Input field for search functionality */}
        <input className="header__searchInput" type="text" />
      </div>

      <div className="header__nav">
        {/* Conditional link to the login page or handle sign out */}
        <Link to={!user && '/login'}>
          <div className="header__option" onClick={handleAuth}>
            <span className="header__optionLineOne">
              {user ? `Hello, ${user.email}` : 'Hello Guest'}
            </span>
            <span className="header__optionLineTwo">
              {user ? 'Sign Out' : 'Sign In'}
            </span>
          </div>
        </Link>

        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        {/* Navigation link to the checkout page */}
        <Link to="/checkout">
          <div className="header__optionBasket">
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length} {/* Display the number of items in the basket */}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

// Export the Header component as the default export
export default Header;
