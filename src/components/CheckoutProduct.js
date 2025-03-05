// Import the necessary React library and other required modules
import React from 'react';
import '../styles/checkoutProduct.css'; // Import the CSS file for styling the component
import { useStateValue } from '../StateProvider'; // Import the useStateValue hook for accessing the global state

// Define the CheckoutProduct functional component, which takes props (id, image, title, price, rating)
function CheckoutProduct({ id, image, title, price, rating }) {
  // Retrieve the basket state and dispatch function using the useStateValue hook
  const [{ basket }, dispatch] = useStateValue();

  // Define the function to remove an item from the basket
  const removeFromBasket = () => {
    // Dispatch the action to remove the item from the basket using the item ID
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: id,
    });
  };

  // Return the JSX structure for the CheckoutProduct component
  return (
    <div className="checkoutProduct">
      {/* Display the product image */}
      <img className="checkoutProduct__image" src={image} alt={title} />

      <div className="checkoutProduct__info">
        {/* Display the product title */}
        <p className="checkoutProduct__title">{title}</p>
        {/* Display the product price */}
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>

        {/* Display the product rating as a series of star emojis */}
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill() // Create an array of length 'rating' and fill it with undefined values
            .map((_, i) => (
              <p key={i}>🌟</p> // Map over the array and render a star emoji for each element, with a unique key
            ))}
        </div>
        {/* Button to remove the item from the basket, calling the removeFromBasket function on click */}
        <button onClick={removeFromBasket}>Remove from Basket</button> 
      </div>
    </div>
  );
}

// Export the CheckoutProduct component as the default export
export default CheckoutProduct;
