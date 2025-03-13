// Import React and the necessary hooks from the React library
import React, { useState } from 'react';

// Import Axios for making HTTP requests to the server
import axios from 'axios';

// Import the CSS file for styling this component (optional, but ensures consistent design)
import '../styles/addProduct.css';

function AddProduct() {
  // State to store the new product's details
  const [newProduct, setNewProduct] = useState({
    title: '',         // Title of the product
    description: '',   // Description of the product
    price: '',         // Price of the product
    category: '',      // Category of the product
    image: ''          // Image URL for the product
  });

  // State for handling the success message after adding a product
  const [successMessage, setSuccessMessage] = useState('');
  
  // State for handling error messages during product addition
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure the name and value from the input element
    setNewProduct((prevProduct) => ({
      ...prevProduct, // Keep the previous state (other fields) intact
      [name]: value   // Update the specific field (e.g., title, price) with the new value
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page from refreshing on form submission
    try {
      // Send a POST request to the API endpoint to add a new product
      const response = await axios.post('https://fakestoreapi.com/products', newProduct);

      // If the request is successful, display a success message
      setSuccessMessage(`Product "${response.data.title}" added successfully!`);

      // Reset the form fields to their initial state
      setNewProduct({
        title: '',
        description: '',
        price: '',
        category: '',
        image: ''
      });

      // Clear any previous error messages
      setErrorMessage('');
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error adding product:', error);

      // Display an error message to the user
      setErrorMessage('Failed to add product. Please try again.');

      // Clear any previous success messages
      setSuccessMessage('');
    }
  };

  // Render the form for adding a new product
  return (
    <div className="add-product-form">
      <h1>Add a New Product</h1>

      {/* Display a success message if one exists */}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Display an error message if one exists */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Form for entering product details */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"                       // Input type for text data
          name="title"                      // Corresponds to the "title" field in newProduct
          value={newProduct.title}          // Current value of the title field
          placeholder="Title"               // Placeholder text in the input field
          onChange={handleChange}           // Update state when the user types
          required                          // Make the field mandatory
        />
        <textarea
          name="description"                // Corresponds to the "description" field
          value={newProduct.description}    // Current value of the description field
          placeholder="Description"         // Placeholder text
          onChange={handleChange}           // Update state on change
          required                          // Make the field mandatory
        ></textarea>
        <input
          type="number"                     // Input type for numerical data
          name="price"                      // Corresponds to the "price" field
          value={newProduct.price}          // Current value of the price field
          placeholder="Price"               // Placeholder text
          onChange={handleChange}           // Update state on change
          required                          // Make the field mandatory
        />
        <input
          type="text"                       // Input type for text data
          name="category"                   // Corresponds to the "category" field
          value={newProduct.category}       // Current value of the category field
          placeholder="Category"            // Placeholder text
          onChange={handleChange}           // Update state on change
          required                          // Make the field mandatory
        />
        <input
          type="text"                       // Input type for text data
          name="image"                      // Corresponds to the "image" field
          value={newProduct.image}          // Current value of the image field
          placeholder="Image URL"           // Placeholder text
          onChange={handleChange}           // Update state on change
        />
        <button type="submit" className="submit-button"> {/* Submit button */}
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct; // Export the component for use in other parts of the application
