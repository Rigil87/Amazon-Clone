// Import the React library to define the functional component
import React from 'react';

// Import the CSS file for applying custom styles specific to the Header component
import '../styles/header.css';

// Import the Link and useNavigate functions from react-router-dom for navigation and routing
import { Link, useNavigate } from 'react-router-dom';

// Import the useStateValue hook to access the global state (like basket and user) managed by Context API
import { useStateValue } from '../StateProvider';

// Import the auth module from Firebase to handle user authentication actions like sign-out
import { auth } from '../firebase';

// Define the Header functional component
function Header() {
  // Retrieve the global state (basket and user) and the dispatch function using useStateValue
  const [{ basket, user }, dispatch] = useStateValue();

  // Initialize the useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle user authentication actions
  const handleAuth = () => {
    if (user) {
      // If the user is logged in, sign them out and redirect them to the login page
      auth.signOut();
      navigate('/login'); // Programmatically navigate to the login page
    }
  };

  // Return the JSX structure for the Header component
  return (
    <div className="header">
      {/* Logo section: Links to the homepage */}
      <Link to="/">
        <img 
          className="header__logo" // CSS class for styling the logo
          src="TL_Logo.jpg" // Source URL for the logo image
          alt="header-logo" // Alt text for accessibility and fallback in case the image doesn't load
        />
      </Link>

      {/* Search bar section */}
      <div className="header__search">
        {/* Input field for user search (styling handled via CSS) */}
        <input className="header__searchInput" type="text" />
      </div>

      {/* Navigation section */}
      <div className="header__nav">
        {/* Conditional link for Sign In/Sign Out */}
        <Link to={!user && '/login'}>
          {/* Display user information or a prompt to log in */}
          <div className="header__option" onClick={handleAuth}>
            <span className="header__optionLineOne">
              {/* If a user is signed in, greet them with their email; otherwise, display "Hello Guest" */}
              {user ? `Hello, ${user.email}` : 'Hello Guest'}
            </span>
            <span className="header__optionLineTwo">
              {/* Show "Sign Out" if the user is logged in, otherwise "Sign In" */}
              {user ? 'Sign Out' : 'Sign In'}
            </span>
          </div>
        </Link>

        {/* Link for "Returns & Orders" section */}
        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>

        {/* Link for the "Your Prime" section */}
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        {/* Link to the "Add Product" page, visible only when the user is logged in */}
        {user && (
          <Link to="/add-product">
            <div className="header__option">
              <span className="header__optionLineOne">Add</span>
              <span className="header__optionLineTwo">Product</span>
            </div>
          </Link>
        )}

        {/* Link to the "Delete Product" page, visible only when the user is logged in */}
        {user && (
          <Link to="/delete-product">
            <div className="header__option">
              <span className="header__optionLineOne">Delete</span>
              <span className="header__optionLineTwo">Product</span>
            </div>
          </Link>
        )}

        {/* Link to the "Checkout" page */}
        <Link to="/checkout">
          {/* Basket icon and item count */}
          <div className="header__optionBasket">
            <span className="header__optionLineTwo header__basketCount">
              {/* Display the total number of items in the basket */}
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

// Export the Header component to make it reusable across the application
export default Header;
