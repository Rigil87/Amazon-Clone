import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Payment from "./components/Payment";
import Orders from "./components/Orders";
import ProductDetails from "./components/ProductDetails"; // Import the new ProductDetails component
import { Routes, Route, useLocation } from "react-router-dom";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import testFirestore, { testAuth } from './tests/firebaseTest';

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
          path="/checkout"
          element={
            <div>
              <Checkout />
            </div>
          }
        />
        <Route
          path="/payment"
          element={
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          }
        />
        <Route
          path="/products/:id" // Add this route for product details
          element={
            <div>
              <ProductDetails />
            </div>
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
