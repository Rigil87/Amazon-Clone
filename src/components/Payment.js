// Import the React library and hooks for managing state and side effects
import React, { useEffect, useState } from 'react';

// Import the CSS file for custom styling specific to the Payment component
import '../styles/payment.css';

// Import the useStateValue hook to access the global state (basket and user)
import { useStateValue } from '../StateProvider';

// Import the CheckoutProduct component to display each product in the basket
import CheckoutProduct from './CheckoutProduct';

// Import Link and useNavigate for client-side navigation using react-router-dom
import { Link, useNavigate } from 'react-router-dom';

// Import Stripe components for card payment functionality and integration
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

// Import CurrencyFormat to format the total price into a readable currency format
import CurrencyFormat from 'react-currency-format';

// Import getBasketTotal to calculate the total value of the items in the basket
import { getBasketTotal } from '../Reducer';

// Import the custom Axios instance for making API requests
import axios from './axios';

// Import the Firestore database configuration from Firebase
import { db } from '../firebase';

// Define the Payment functional component
function Payment() {
  // Access the global state (basket and user) and the dispatch function
  const [{ basket, user }, dispatch] = useStateValue();

  // Initialize Stripe hooks for handling payments
  const stripe = useStripe();
  const elements = useElements();

  // useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // State variables for managing payment process
  const [succeeded, setSucceeded] = useState(false); // Tracks if payment was successful
  const [processing, setProcessing] = useState(false); // Tracks if payment is currently processing
  const [error, setError] = useState(null); // Stores any error messages during the payment process
  const [disabled, setDisabled] = useState(true); // Tracks if the "Buy Now" button should be disabled
  const [clientSecret, setClientSecret] = useState(''); // Holds the client secret for Stripe

  // useEffect hook to fetch the client secret when the basket changes
  useEffect(() => {
    // Redirect to homepage if basket is empty
    if (basket.length === 0) {
      navigate('/');
      return;
    }

    // Function to fetch the client secret for Stripe payment processing
    const getClientSecret = async () => {
      try {
        const response = await axios({
          method: 'post',
          url: `/payments/create?total=${getBasketTotal(basket) * 100}`, // Multiply by 100 to convert to cents
        });
        setClientSecret(response.data.clientSecret); // Store the client secret in state
      } catch (error) {
        console.error('Error fetching client secret:', error); // Log any errors for debugging
      }
    };

    getClientSecret(); // Invoke the function to fetch client secret
  }, [basket, navigate]); // Dependency array ensures this runs when basket changes

  // Function to handle form submission and process payment
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setProcessing(true); // Set processing state to true

    try {
      // Ensure the client secret is available
      if (!clientSecret) {
        throw new Error('Client secret is missing');
      }

      // Use Stripe to confirm the card payment
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement), // Get the card details entered by the user
        },
      });

      if (payload.error) {
        throw new Error(payload.error.message); // Throw an error if payment fails
      }

      // Retrieve the payment intent (successful payment details)
      const paymentIntent = payload.paymentIntent;

      // Ensure a user is logged in before saving the order
      if (!user?.uid) {
        throw new Error('User not logged in');
      }

      // Save the order in Firestore under the user's orders collection
      await db
        .collection('users')
        .doc(user.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
          basket: basket, // The items in the basket
          amount: paymentIntent.amount, // Total amount paid
          created: paymentIntent.created, // Timestamp of the payment
        });

      setSucceeded(true); // Mark the payment as successful
      setProcessing(false); // Stop processing state
      dispatch({ type: 'EMPTY_BASKET' }); // Clear the basket
      navigate('/orders', { replace: true }); // Redirect to the Orders page
    } catch (error) {
      setError(error.message); // Store the error message
      setProcessing(false); // Stop processing state
    }
  };

  // Function to handle changes in the CardElement (user input in the payment field)
  const handleChange = (event) => {
    setDisabled(event.empty); // Disable the button if the input field is empty
    setError(event.error ? event.error.message : ''); // Set the error message if any
  };

  // Return the JSX structure for the Payment component
  return (
    <div className="payment">
      <div className="payment__container">
        {/* Header showing the number of items in the basket */}
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        {/* Section for displaying the delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p> {/* Display the user's email */}
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* Section for reviewing items in the basket */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {/* Render a CheckoutProduct component for each item in the basket */}
            {basket.map((item, index) => (
              <CheckoutProduct
                key={`${item.id}-${index}`} // Unique key combining ID and index
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Section for payment details */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Form to handle payment */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} /> {/* Stripe payment card input */}
              <div className="payment__priceContainer">
                {/* Display the order total using CurrencyFormat */}
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)} // Calculate the total value of the basket
                  displayType="text"
                  thousandSeparator={true} // Add commas for thousands
                  prefix={"$"} // Display the dollar sign
                />
                {/* Button to submit the payment */}
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? "Processing..." : "Buy Now"}</span>
                </button>
              </div>
              {/* Display an error message, if any */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the Payment component to make it reusable across the application
export default Payment;
