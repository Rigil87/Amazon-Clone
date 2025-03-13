// Import the React library to enable creating components
import React from 'react';

// Import Link from react-router-dom to handle navigation to different routes
import { Link } from 'react-router-dom';

// Import the CSS file for styling specific to the Product component
import '../styles/product.css';

// Import the useStateValue hook to interact with the global state (e.g., basket)
import { useStateValue } from '../StateProvider';

// Define the Product functional component
// Props passed to this component include id, title, image, price, and rating
function Product({ id, title, image, price, rating }) {
  // Access the global state (basket) and the dispatch function to modify the state
  const [{ basket }, dispatch] = useStateValue();

  // Function to handle adding a product to the basket
  const addToBasket = () => {
    // Dispatch an action to add the item to the basket in the global state
    dispatch({
      type: 'ADD_TO_BASKET', // Action type used in the reducer to add an item
      item: {
        id: id,           // Product ID
        title: title,     // Product title
        image: image,     // Product image URL
        price: price,     // Product price
        rating: rating,   // Product rating
      },
    });
  };

  // Return the JSX structure for rendering the Product component
  return (
    <div className="product">
      {/* Product information section */}
      <div className="product__info">
        <p>{title}</p> {/* Display the product title */}
        <p className="product__price">
          <small>$</small> {/* Display a dollar sign */}
          <strong>{price}</strong> {/* Display the product price */}
        </p>
        {/* Render the product rating as a series of star emojis */}
        <div className="product__rating">
          {Array(rating) // Create an array of length equal to the rating value
            .fill() // Fill the array with undefined values
            .map((_, i) => (
              <p key={i}>🌟</p> // Map over the array and render a star for each element
            ))}
        </div>
      </div>

      {/* Display the product image */}
      <img src={image} alt={title} /> {/* The alt attribute provides a fallback description */}

      {/* Container for action buttons */}
      <div className="product__buttons">
        {/* Button to add the product to the basket */}
        <button 
          className='button1'  // CSS class for styling the button
          onClick={addToBasket} // Call the addToBasket function when clicked
        >
          Add to Basket
        </button>

        {/* Link to the product details page */}
        <Link to={`/products/${id}`}>
          <button className='button2'> {/* CSS class for a separate button style */}
            Show Details
          </button>
        </Link>
      </div>
    </div>
  );
}

// Export the Product component to make it reusable in other parts of the application
export default Product;
