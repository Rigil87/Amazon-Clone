// Import the React library to define a functional component
import React from 'react';

// Import the CSS file for styling the CheckoutProduct component
import '../styles/checkoutProduct.css';

// Import the useStateValue hook to access and interact with the global state (basket data)
import { useStateValue } from '../StateProvider';

// Define the CheckoutProduct functional component
// This component receives props: id (product ID), image (URL of the product image), title (name of the product), price (product cost), and rating (product review rating)
function CheckoutProduct({ id, image, title, price, rating }) {
  // Use the useStateValue hook to retrieve the global state and its dispatcher function
  const [{ basket }, dispatch] = useStateValue();

  // Define the function to handle removing an item from the basket
  const removeFromBasket = () => {
    // Use the dispatch function to send an action to the reducer
    // The action type is 'REMOVE_FROM_BASKET' and it carries the ID of the product to be removed
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: id, // Pass the product's ID so the reducer knows which item to remove
    });
  };

  // Return the JSX structure of the CheckoutProduct component
  return (
    <div className="checkoutProduct">
      {/* Render the product image */}
      <img 
        className="checkoutProduct__image" // Apply styling using the CSS class
        src={image} // The source of the image, passed as a prop
        alt={title} // The alt text for accessibility and in case the image fails to load
      />

      {/* Container for product information */}
      <div className="checkoutProduct__info">
        {/* Display the product title */}
        <p className="checkoutProduct__title">{title}</p>

        {/* Display the product price */}
        <p className="checkoutProduct__price">
          <small>$</small>  {/* Dollar sign */}
          <strong>{price}</strong>  {/* Actual price value, passed as a prop */}
        </p>

        {/* Render the product's rating using star emojis */}
        <div className="checkoutProduct__rating">
          {/* Create an array of length 'rating', fill it with undefined values, and map over it */}
          {Array(rating)
            .fill() // Fill the array so we can iterate through it
            .map((_, i) => (
              <p key={i}>🌟</p> // Render a star emoji for each rating point, with a unique key for each
            ))}
        </div>

        {/* Button to remove the product from the basket */}
        <button onClick={removeFromBasket}>
          Remove from Basket {/* Button text */}
        </button>
      </div>
    </div>
  );
}

// Export the CheckoutProduct component as the default export
export default CheckoutProduct;
