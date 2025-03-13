// Import the React library to define a React functional component
import React from 'react';

// Import the CSS file for custom styling specific to the Checkout component
import '../styles/checkout.css';

// Import the Subtotal component, which calculates and displays the total price of items in the basket
import Subtotal from './Subtotal';

// Import the useStateValue hook to access the global state (basket and user data) from the context API
import { useStateValue } from '../StateProvider';

// Import the CheckoutProduct component, used to display each individual item in the shopping basket
import CheckoutProduct from './CheckoutProduct';

// Define the Checkout functional component
function Checkout() {
  // Destructure basket (array of items) and user (logged-in user info) from the global state using useStateValue
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    // Main container for the Checkout page
    <div className="checkout">
      {/* Left section of the Checkout page */}
      <div className="checkout__left">
        {/* Banner advertisement */}
        <img
          className="checkout__ad" // CSS class for styling the banner image
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" // Banner image URL
          alt="banner-checkout" // Alternative text for accessibility and in case the image fails to load
        />

        <div>
          {/* Display a greeting if the user is logged in, showing their email address */}
          <h3>Hello, {user?.email}</h3>
          {/* Heading for the shopping basket section */}
          <h2 className="checkout__title">Your Shopping Basket</h2>

          {/* Iterate through the basket array and render a CheckoutProduct component for each item */}
          {basket.map((item, index) => (
            <CheckoutProduct
              key={`${item.id}-${index}`} // Unique key combining item ID and index to avoid key duplication
              id={item.id}                // Pass the product ID as a prop to CheckoutProduct
              title={item.title}          // Pass the product title as a prop
              image={item.image}          // Pass the product image URL as a prop
              price={item.price}          // Pass the product price as a prop
              rating={item.rating}        // Pass the product rating as a prop
            />
          ))}
        </div>
      </div>
      
      {/* Right section of the Checkout page */}
      <div className="checkout__right">
        {/* Render the Subtotal component, which displays the total cost of items in the basket */}
        <Subtotal />
      </div>
    </div>
  );
}

// Export the Checkout component as the default export so it can be imported and used in other parts of the app
export default Checkout;
