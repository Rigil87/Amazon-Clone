// Import the React library to enable creating components
import React from 'react';

// Import the CSS file for styling specific to the Subtotal component
import '../styles/subtotal.css';

// Import CurrencyFormat to format the total value into a readable currency format
import CurrencyFormat from 'react-currency-format';

// Import the useStateValue hook to access the global state, such as the basket
import { useStateValue } from '../StateProvider';

// Import the getBasketTotal function to dynamically calculate the total basket value
import { getBasketTotal } from '../Reducer';

// Import the useNavigate hook to enable navigation between pages programmatically
import { useNavigate } from 'react-router-dom';

// Define the Subtotal functional component
function Subtotal() {
  // Initialize the useNavigate hook for navigation to different pages
  const navigate = useNavigate();

  // Use the useStateValue hook to access the basket state from the global context
  const [{ basket }] = useStateValue();

  // Return the JSX structure for rendering the Subtotal component
  return (
    <div className='subtotal'>
      {/* Use CurrencyFormat to display the subtotal price in a formatted manner */}
      <CurrencyFormat
        renderText={(value) => (
          <>
            {/* Display the number of items in the basket and the total price */}
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>

            {/* Provide an option for the user to mark the order as a gift */}
            <small className='subtotal__gift'>
              <input type='checkbox' /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2} // Ensure that the displayed total has two decimal places
        value={getBasketTotal(basket)} // Dynamically calculate the total value of the basket
        displayType={'text'} // Render the formatted value as plain text
        thousandSeparator={true} // Add commas as thousand separators
        prefix={'$'} // Prefix the total value with a dollar sign
      />

      {/* Button to navigate to the payment page */}
      <button 
        onClick={e => navigate('/payment')} // Navigate to the '/payment' route when clicked
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

// Export the Subtotal component as the default export to enable its reuse across the application
export default Subtotal;
