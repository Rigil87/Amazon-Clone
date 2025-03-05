// Import the necessary React library and other required modules
import React from 'react';
import '../styles/checkout.css'; // Import the CSS file for styling the component
import Subtotal from './Subtotal'; // Import the Subtotal component
import { useStateValue } from '../StateProvider'; // Import the useStateValue hook for accessing the global state
import CheckoutProduct from './CheckoutProduct'; // Import the CheckoutProduct component

function Checkout() {
  // Retrieve the basket and user from the global state using the useStateValue hook
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        {/* Display a banner image */}
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="banner-checkout"
        />

        <div>
          {/* Greet the user if they are logged in */}
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout__title">Your Shopping Basket</h2>

          {/* Map over the basket array and render a CheckoutProduct component for each item */}
          {basket.map((item, index) => (
            <CheckoutProduct
              key={`${item.id}-${index}`} // Ensure each key is unique by combining item ID and index
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
      
      <div className="checkout__right">
        {/* Render the Subtotal component on the right side */}
        <Subtotal />
      </div>
    </div>
  );
}

// Export the Checkout component as the default export
export default Checkout;
