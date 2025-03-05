// Import the necessary React library and other required modules
import React from 'react';
import '../styles/product.css'; // Import the CSS file for styling the component
import { useStateValue } from '../StateProvider'; // Import the useStateValue hook for accessing the global state

// Define the Product functional component with props (id, title, image, price, rating)
function Product({ id, title, image, price, rating }) {
  // Retrieve the basket state and dispatch function using the useStateValue hook
  const [{ basket }, dispatch] = useStateValue();

  // Define the function to add an item to the basket
  const addToBasket = () => {
    // Dispatch the action to add the item to the basket
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  // Return the JSX structure for the Product component
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p> {/* Display the product title */}
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong> {/* Display the product price */}
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill() // Create an array of length 'rating' and fill it with undefined values
            .map((_, i) => (
              <p key={i}>🌟</p> // Map over the array and render a star emoji for each element, with a unique key
            ))}
        </div>
      </div>

      <img src={image} alt={title} /> {/* Display the product image */}

      <button onClick={addToBasket}>Add to Basket</button> {/* Button to add the item to the basket */}
    </div>
  );
}

// Export the Product component as the default export
export default Product;