// Import the necessary React library and other required modules
import React from 'react';
import '../styles/order.css'; // Import the CSS file for styling the component
import moment from 'moment'; // Import moment for date formatting
import CheckoutProduct from './CheckoutProduct'; // Import the CheckoutProduct component
import CurrencyFormat from 'react-currency-format'; // Import CurrencyFormat for currency formatting

// Define the Order functional component with the 'order' prop
function Order({ order }) {
  // Return the JSX structure for the Order component
  return (
    <div className='order'>
      <h2>Order</h2>
      {/* Format the order creation date using moment */}
      <p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}</p>
      <p className='order__id'>
        <small>{order.id}</small>
      </p>
      {/* Map over the items in the order's basket and render a CheckoutProduct component for each */}
      {order.data.basket?.map((item) => (
        <CheckoutProduct
          key={item.id} // Ensure each key is unique
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
        />
      ))}
      {/* Format the order total amount using CurrencyFormat */}
      <CurrencyFormat
        renderText={(value) => (
          <>
            <h3 className='order__total'>Order Total: {value}</h3>
          </>
        )}
        decimalScale={2} // Display two decimal places
        value={order.data.amount / 100} // Convert amount to a formatted value
        displayType={'text'} // Display as text
        thousandSeparator={true} // Use thousand separators
        prefix={'$'} // Add dollar sign as prefix
      />
    </div>
  );
}

// Export the Order component as the default export
export default Order;
