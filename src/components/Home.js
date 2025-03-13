// Import React and necessary hooks for state management and side effects
import React, { useEffect, useState } from 'react';

// Import the CSS file to style the Home component
import '../styles/home.css';

// Import the Product component for displaying individual product details
import Product from './Product';

// Import axios for making HTTP requests to fetch product data
import axios from 'axios';

// Import the Banner component for displaying the banner at the top of the Home page
import Banner from './Banner';

// Define the Home functional component
function Home() {
  // State to store the list of products fetched from the API
  const [products, setProducts] = useState([]);

  // State to store rows of products for dynamic rendering
  const [rows, setRows] = useState([]);

  // useEffect to fetch products when the component first mounts
  useEffect(() => {
    // Asynchronous function to fetch product data from the API
    const fetchProducts = async () => {
      try {
        // Make a GET request to the API
        const response = await axios.get('https://fakestoreapi.com/products');
        // Update the products state with the fetched data
        setProducts(response.data);
      } catch (error) {
        // Log any error that occurs during the fetch request
        console.error('Error fetching products:', error);
      }
    };

    // Call the fetchProducts function
    fetchProducts();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // useEffect to dynamically generate rows of products whenever the products state changes
  useEffect(() => {
    // Check if there are products to generate rows
    if (products.length > 0) {
      const generateRows = () => {
        const rows = []; // Initialize an array to store rows
        let index = 0;   // Initialize the starting index for slicing products
        const possibleCounts = [1, 2, 3]; // Define possible numbers of products per row

        // Loop through the products and create rows
        while (index < products.length) {
          // Randomly determine the number of items in the current row
          const itemsInRow = possibleCounts[Math.floor(Math.random() * possibleCounts.length)];
          
          // Slice the products array to get items for this row
          const rowItems = products.slice(index, index + itemsInRow);

          // Push a row into the rows array, containing Product components for each item
          rows.push(
            <div className="home__row" key={index}>
              {rowItems.map((product) => (
                <Product
                  key={product.id}        // Unique key for each product
                  id={product.id}         // Pass product ID as a prop
                  title={product.title}   // Pass product title as a prop
                  image={product.image}   // Pass product image as a prop
                  price={product.price}   // Pass product price as a prop
                  rating={Math.floor(Math.random() * 5) + 1} // Randomize rating for demonstration
                />
              ))}
            </div>
          );

          // Move the index forward by the number of items in the current row
          index += itemsInRow;
        }

        return rows; // Return the generated rows
      };

      // Update the rows state with the newly generated rows
      setRows(generateRows());
    }
  }, [products]); // Dependency array ensures this runs when products change

  // Return the JSX structure for the Home component
  return (
    <div className="home">
      {/* Render the Banner component at the top */}
      <Banner />
      <div className="home__container">
        {/* Render the dynamically generated rows of products */}
        {rows}
      </div>
    </div>
  );
}

// Export the Home component to make it reusable across the application
export default Home;
