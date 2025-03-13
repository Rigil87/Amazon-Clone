// Import the React library to define the functional component
import React from 'react';

// Import the CSS file to style the Order component
import '../styles/order.css';

// Import the moment.js library to handle and format dates
import moment from 'moment';

// Import the CheckoutProduct component to display individual products within the order
import CheckoutProduct from './CheckoutProduct';

// Import the CurrencyFormat library to format the order total in a readable currency format
import CurrencyFormat from 'react-currency-format';

// Define the Order functional component
// The 'order' prop is passed to this component to represent the details of a specific order
function Order({ order }) {
  // Return the JSX structure of the Order component
  return (
    <div className='order'>
      {/* Display the title of the order section */}
      <h2>Order</h2>

      {/* Format and display the order's creation date using moment.js */}
      {/* moment.unix converts a Unix timestamp to a readable date format */}
      <p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}</p>

      {/* Display the order ID for reference */}
      <p className='order__id'>
        <small>{order.id}</small> {/* Show the order ID in a smaller font size */}
      </p>

      {/* Render each product in the order's basket by mapping over the basket array */}
      {order.data.basket?.map((item) => (
        <CheckoutProduct
          key={item.id} // Use a unique key for each product to optimize rendering
          id={item.id} // Pass the product ID as a prop to the CheckoutProduct component
          title={item.title} // Pass the product title
          image={item.image} // Pass the product image URL
          price={item.price} // Pass the product price
          rating={item.rating} // Pass the product rating
        />
      ))}

      {/* Format and display the order total using the CurrencyFormat library */}
      <CurrencyFormat
        renderText={(value) => (
          <>
            {/* Render the formatted total value inside an h3 element */}
            <h3 className='order__total'>Order Total: {value}</h3>
          </>
        )}
        decimalScale={2} // Show two decimal places for the total amount
        value={order.data.amount / 100} // Convert the total amount from cents to dollars
        displayType={'text'} // Render the formatted value as plain text
        thousandSeparator={true} // Add commas as thousand separators
        prefix={'$'} // Add a dollar sign as the currency prefix
      />
    </div>
  );
}

// Export the Order component as the default export to make it reusable across the application
export default Order;
