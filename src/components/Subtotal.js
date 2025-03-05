// Import the necessary React library and other required modules
import React from 'react';
import '../styles/subtotal.css'; // Import the CSS file for styling the component
import CurrencyFormat from 'react-currency-format'; // Import CurrencyFormat for currency formatting
import { useStateValue } from '../StateProvider'; // Import the useStateValue hook for accessing the global state
import { getBasketTotal } from '../Reducer'; // Import the getBasketTotal function to calculate the basket total
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom for navigation

// Define the Subtotal functional component
function Subtotal() {
  const navigate = useNavigate(); // Initialize the useNavigate hook for navigation
  const [{ basket }] = useStateValue(); // Access the basket state using the useStateValue hook

  // Return the JSX structure for the Subtotal component
  return (
    <div className='subtotal'>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* Display the subtotal count dynamically using the basket state */}
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className='subtotal__gift'>
              <input type='checkbox' /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2} // Set the number of decimal places to 2
        value={getBasketTotal(basket)} // Calculate the total value of the basket
        displayType={'text'}
        thousandSeparator={true} // Use thousand separators
        prefix={'$'} // Prefix for the currency symbol (dollar)
      />

      {/* Button to navigate to the payment page */}
      <button onClick={e => navigate('/payment')}>Proceed to Checkout</button>
    </div>
  );
}

// Export the Subtotal component as the default export
export default Subtotal;
