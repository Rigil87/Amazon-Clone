// Import the necessary React library and other required modules
import React, { useEffect, useState } from 'react';
import '../styles/payment.css'; // Import the CSS file for styling the component
import { useStateValue } from '../StateProvider'; // Import the useStateValue hook for accessing the global state
import CheckoutProduct from './CheckoutProduct'; // Import the CheckoutProduct component
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom for navigation
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'; // Import Stripe components
import CurrencyFormat from 'react-currency-format'; // Import CurrencyFormat for currency formatting
import { getBasketTotal } from '../Reducer'; // Import getBasketTotal selector for calculating the total price
import axios from './axios'; // Import the custom axios instance
import { db } from '../firebase'; // Import the Firestore database from firebase.js

// Define the Payment functional component
function Payment() {
  // Retrieve the basket and user from the global state using the useStateValue hook
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe(); // Initialize the useStripe hook for Stripe integration
  const elements = useElements(); // Initialize the useElements hook for Stripe integration
  const navigate = useNavigate(); // Initialize the useNavigate hook for navigation

  // Initialize state variables
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  // useEffect hook to handle side effects
  useEffect(() => {
    if (basket.length === 0) {
      navigate('/'); // Redirect to the homepage if the basket is empty
      return;
    }
    // Function to fetch the client secret for processing payments
    const getClientSecret = async () => {
      try {
        const response = await axios({
          method: 'post',
          url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
        });
        setClientSecret(response.data.clientSecret); // Set the client secret in the state
      } catch (error) {
        console.error('Error fetching client secret:', error);
      }
    };
    getClientSecret();
  }, [basket, navigate]);

  // Function to handle form submission for payment
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    try {
      if (!clientSecret) {
        throw new Error('Client secret is missing');
      }
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (payload.error) {
        throw new Error(payload.error.message);
      }

      const paymentIntent = payload.paymentIntent;

      if (!user?.uid) {
        throw new Error('User not logged in');
      }

      await db
        .collection('users')
        .doc(user.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      setSucceeded(true);
      setProcessing(false);
      dispatch({ type: 'EMPTY_BASKET' });
      navigate('/orders', { replace: true });
    } catch (error) {
      setError(error.message);
      setProcessing(false);
    }
  };

  // Function to handle changes in the CardElement
  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  return (
    <div className="payment">
      <div className="payment__container">
        {/* Header displaying the number of items in the basket */}
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
  
        {/* Section for delivery address */}
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
  
        {/* Section for reviewing items and delivery */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {/* Map over the basket items and render a CheckoutProduct component for each */}
            {basket.map((item, index) => (
              <CheckoutProduct
                key={`${item.id}-${index}`} // Ensure each key is unique by combining item ID and index
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
  
        {/* Section for payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Form to handle payment submission */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} /> {/* Stripe Card Element for entering card details */}
              <div className="payment__priceContainer">
                {/* Display the order total using CurrencyFormat */}
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)} // Get the total amount from the basket
                  displayType="text"
                  thousandSeparator={true}
                  prefix={"$"}
                />
                {/* Button to submit the payment form */}
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? "Processing..." : "Buy Now"}</span>
                </button>
              </div>
              {/* Display error message if there is an error */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Payment