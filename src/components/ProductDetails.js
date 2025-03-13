// Import React and necessary hooks for managing state and side effects
import React, { useEffect, useState } from 'react';

// Import useParams from react-router-dom to access route parameters (e.g., product ID)
import { useParams } from 'react-router-dom';

// Import axios for making HTTP requests
import axios from 'axios';

// Import the CSS file for styling the ProductDetails component
import '../styles/productDetails.css';

// Import the EditForm component for editing product details
import EditForm from './EditForm';

// Define the ProductDetails functional component
function ProductDetails() {
  // Retrieve the product ID from the URL using useParams
  const { id } = useParams();

  // State to store the fetched product data
  const [product, setProduct] = useState(null);

  // State to manage whether the component is in "edit mode"
  const [editing, setEditing] = useState(false);

  // State to store the updated product data while editing
  const [updatedProduct, setUpdatedProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: ''
  });

  // useEffect hook to fetch product details when the component mounts or the ID changes
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Make a GET request to the API to retrieve product data based on the ID
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data); // Set the product state with the fetched data
        setUpdatedProduct(response.data); // Pre-fill the updated product state with the current product data
      } catch (error) {
        // Log any errors that occur while fetching data
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct(); // Invoke the function to fetch product data
  }, [id]); // Dependency array ensures the effect runs when the ID changes

  // Function to handle changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure the name and value from the input element
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct, // Keep the previous product state intact
      [name]: value   // Update the specific field being edited
    }));
  };

  // Function to handle saving the updated product details
  const handleUpdate = async () => {
    try {
      // Make a PUT request to update the product on the server
      const response = await axios.put(`https://fakestoreapi.com/products/${id}`, updatedProduct);
      setProduct(response.data); // Update the product state with the new data
      setEditing(false); // Exit edit mode
    } catch (error) {
      // Log any errors that occur while updating the product
      console.error('Error updating product:', error);
    }
  };

  // Function to cancel edit mode and reset the editing state
  const cancelEdit = () => setEditing(false);

  // If the product data is not yet available, display a loading message
  if (!product) return <div>Loading...</div>;

  // Return the JSX structure for rendering the product details
  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left column for displaying the product image */}
        <div className="col-md-6">
          <img 
            src={product.image} // Product image URL
            className="img-fluid" // Bootstrap class for responsive images
            alt={product.title} // Alt text for accessibility
          />
        </div>

        {/* Right column for displaying product details or the edit form */}
        <div className="edit__form col-md-6">
          {editing ? (
            // Render the EditForm component when in edit mode
            <EditForm
              updatedProduct={updatedProduct} // Pass the current updated product state
              handleChange={handleChange}     // Pass the function to handle input changes
              handleUpdate={handleUpdate}     // Pass the function to save updates
              cancelEdit={cancelEdit}         // Pass the function to cancel editing
            />
          ) : (
            // Display the product details when not in edit mode
            <>
              <h1>{product.title}</h1> {/* Product title */}
              <p>{product.description}</p> {/* Product description */}
              <p>Price: ${product.price}</p> {/* Product price */}
              <p>Category: {product.category}</p> {/* Product category */}
              <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p> {/* Product rating and review count */}
              <p><strong>Product ID:</strong> {product.id}</p> {/* Product ID for reference */}
              {/* Button to enable edit mode */}
              <button
                className="edit__button" // CSS class for styling
                onClick={() => setEditing(true)} // Enable edit mode when clicked
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Export the ProductDetails component to make it reusable across the application
export default ProductDetails;
