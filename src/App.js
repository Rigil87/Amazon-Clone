// Import the necessary React library and other required modules
import React, { useEffect } from "react";
import "./App.css"; // Import the CSS file for styling the component
import Header from "./components/Header"; // Import the Header component
import Home from "./components/Home"; // Import the Home component
import Checkout from "./components/Checkout"; // Import the Checkout component
import Login from "./components/Login"; // Import the Login component
import Payment from "./components/Payment"; // Import the Payment component
import Orders from "./components/Orders"; // Import the Orders component
import { Routes, Route, useLocation } from "react-router-dom"; // Import routing components from react-router-dom
import { auth } from "./firebase"; // Import the Firebase authentication module
import { useStateValue } from "./StateProvider"; // Import the useStateValue hook for accessing the global state
import { Elements } from '@stripe/react-stripe-js'; // Import Elements component from Stripe for payment integration
import { loadStripe } from '@stripe/stripe-js'; // Import loadStripe function to initialize Stripe
import testFirestore, { testAuth } from './tests/firebaseTest'; // Import Firebase test functions

// Initialize Stripe with your publishable key
const promise = loadStripe("pk_live_51Qwx05P5ms7TrF3S6CxhgzDcNgkuluIlO5cBqm6ZoBeL8cVom0BftWkRWm5DnnitqlzQt25r232csBBmwIeaHIc00SuldkuOI");

function App() {
  const [{}, dispatch] = useStateValue();
  const location = useLocation(); // Get the current location

  useEffect(() => {
    // Monitor authentication state changes
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>>", authUser);

      if (authUser) {
        // The user just logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // The user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    // Run Firebase connection tests
    testFirestore();
    testAuth();
  }, [dispatch]);

  return (
    <div className="App">
      {/* Conditionally render the Header */}
      {location.pathname !== "/login" && <Header />}
      <Routes>
        <Route
          path="/login"
          element={
            <div>
              <Login />
            </div>
          }
        />
        <Route
          path="/orders"
          element={
            <div>
              <Orders />
            </div>
          }
        />
        <Route
          path="/Checkout"
          element={
            <div>
              <Checkout />
            </div>
          }
        />
        <Route
          path="/Payment"
          element={
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          }
        />
        {/* Default route must be at bottom */}
        <Route
          path="/"
          element={
            <div>
              <Home />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
