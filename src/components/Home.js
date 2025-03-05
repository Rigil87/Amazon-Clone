// Import necessary React libraries and other required modules
import React, { useEffect, useState } from 'react';
import '../styles/home.css'; // Import the CSS file for styling the Home component
import Product from './Product'; // Import the Product component to display individual products
import axios from 'axios'; // Import axios for making HTTP requests
import Banner from './Banner'; // Import the Banner component to display the banner image

// Define the Home functional component
function Home() {
  // Initialize the state variable 'products' to store the fetched product data
  const [products, setProducts] = useState([]);

  // useEffect hook to fetch products from the API when the component mounts
  useEffect(() => {
    // Define an asynchronous function to fetch products
    const fetchProducts = async () => {
      try {
        // Make a GET request to the API to fetch products
        const response = await axios.get('https://fakestoreapi.com/products');
        // Update the 'products' state variable with the fetched data
        setProducts(response.data);
      } catch (error) {
        // Log any errors that occur during the API request
        console.error('Error fetching products:', error);
      }
    };

    // Call the fetchProducts function
    fetchProducts();
  }, []); // Empty dependency array ensures this effect runs only once

  // Function to get a random number of items for each row
  const getRandomItemsCount = () => {
    // Define possible counts for the number of items in a row
    const possibleCounts = [1, 2, 3]; // Customize this array if needed
    // Return a random count from the possible counts array
    return possibleCounts[Math.floor(Math.random() * possibleCounts.length)];
  };

  // Function to generate rows of products
  const generateRows = () => {
    // Initialize an array to store the rows
    const rows = [];
    // Initialize an index to keep track of the current product
    let index = 0;

    // Loop through the products array and create rows
    while (index < products.length) {
      // Get a random number of items for the current row
      const itemsInRow = getRandomItemsCount();
      // Slice the products array to get the items for the current row
      const rowItems = products.slice(index, index + itemsInRow);
      // Push a new row element into the rows array
      rows.push(
        <div className="home__row" key={index}>
          {rowItems.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              rating={Math.floor(Math.random() * 5) + 1} // Generate a random rating for demonstration
            />
          ))}
        </div>
      );
      // Increment the index by the number of items in the current row
      index += itemsInRow;
    }

    // Return the array of rows to be rendered
    return rows;
  };

  // Return the JSX structure for the Home component
  return (
    <div className="home">
      {/* Render the Banner component */}
      <Banner />
      <div className="home__container">
        {/* Render the rows of products */}
        {generateRows()}
      </div>
    </div>
  );
}

// Export the Home component as the default export
export default Home;
