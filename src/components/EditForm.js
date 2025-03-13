// Import the CSS file to style the EditForm component
import '../styles/editForm.css';

// Import the React library to define a React functional component
import React from 'react';

// Define the EditForm functional component
// This component receives four props:
// 1. updatedProduct: An object containing the current product data to be edited
// 2. handleChange: A function to handle updates to the form fields
// 3. handleUpdate: A function to save the updated product details
// 4. cancelEdit: A function to cancel the editing process
function EditForm({ updatedProduct, handleChange, handleUpdate, cancelEdit }) {
  return (
    // Main container for the form
    <div>
      {/* Input field for the product title */}
      <input
        type="text"                     // Input type for text data
        name="title"                    // Name attribute corresponds to the 'title' key in updatedProduct
        value={updatedProduct.title}    // Bind the value of this input to the 'title' property in updatedProduct
        onChange={handleChange}         // Call handleChange when the user types in this field
      />

      {/* Textarea for the product description */}
      <textarea
        name="description"              // Name attribute corresponds to the 'description' key
        value={updatedProduct.description} // Bind the value to the 'description' property
        onChange={handleChange}         // Call handleChange when the user types in this field
      ></textarea>

      {/* Input field for the product price */}
      <input
        type="number"                   // Input type for numerical data
        name="price"                    // Name attribute corresponds to the 'price' key
        value={updatedProduct.price}    // Bind the value to the 'price' property
        onChange={handleChange}         // Call handleChange when the user modifies the value
      />

      {/* Input field for the product category */}
      <input
        type="text"                     // Input type for text data
        name="category"                 // Name attribute corresponds to the 'category' key
        value={updatedProduct.category} // Bind the value to the 'category' property
        onChange={handleChange}         // Call handleChange to handle updates
      />

      {/* Input field for the product image URL */}
      <input
        type="text"                     // Input type for text data
        name="image"                    // Name attribute corresponds to the 'image' key
        value={updatedProduct.image}    // Bind the value to the 'image' property
        onChange={handleChange}         // Call handleChange when the input changes
      />

      {/* Button to save the updated product details */}
      <button 
        className="save__button"        // CSS class for styling this button
        onClick={handleUpdate}          // Call handleUpdate when the button is clicked
      >
        Save
      </button>

      {/* Button to cancel the editing process */}
      <button 
        className="cancel__button"      // CSS class for styling this button
        onClick={cancelEdit}            // Call cancelEdit when the button is clicked
      >
        Cancel
      </button>
    </div>
  );
}

// Export the EditForm component to make it reusable in other parts of the application
export default EditForm;
