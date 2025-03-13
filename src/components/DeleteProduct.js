// Import the React library to define a functional component
import React, { useState } from 'react';

// Import Axios for making HTTP requests to the server (used here to send DELETE requests)
import axios from 'axios';

// Import the CSS file for styling specific to the DeleteProduct component (optional but recommended for modular styling)
import '../styles/deleteProduct.css';

function DeleteProduct() {
  // State to store the product ID entered by the user
  const [productId, setProductId] = useState('');

  // State for showing a success message after a product is successfully deleted
  const [successMessage, setSuccessMessage] = useState('');

  // State for showing an error message if the deletion fails
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle the deletion of a product
  const handleDelete = async () => {
    try {
      // Send a DELETE request to the API using the product ID
      await axios.delete(`https://fakestoreapi.com/products/${productId}`);
      
      // If successful, update the successMessage state to notify the user
      setSuccessMessage(`Product with ID: ${productId} has been deleted successfully.`);
      
      // Clear the productId input field for better user experience
      setProductId('');
      
      // Ensure that no error message is displayed in case it was previously set
      setErrorMessage('');
    } catch (error) {
      // Log the error in the console for debugging purposes
      console.error('Error deleting product:', error);
      
      // Update the errorMessage state to notify the user of the failure
      setErrorMessage('Failed to delete product. Please check the ID and try again.');
      
      // Clear any previous success messages
      setSuccessMessage('');
    }
  };

  // Return the JSX structure of the DeleteProduct component
  return (
    <div className="delete-product-form">
      {/* Title for the delete form */}
      <h1>Delete a Product</h1>

      {/* Conditionally render a success message if it exists */}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Conditionally render an error message if it exists */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Input field for the user to enter the Product ID */}
      <input
        type="text"                    // Input type is text
        value={productId}              // Controlled component: value tied to productId state
        onChange={(e) => setProductId(e.target.value)} // Update productId state on user input
        placeholder="Enter Product ID" // Placeholder text for the input field
        required                       // Make the input field mandatory
      />

      {/* Button to trigger the handleDelete function to delete the product */}
      <button onClick={handleDelete} className="delete-button">
        Delete Product
      </button>
    </div>
  );
}

// Export the DeleteProduct component to make it reusable across the application
export default DeleteProduct;
