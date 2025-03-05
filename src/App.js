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
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>>", authUser);

      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    testFirestore();
    testAuth();
  }, [dispatch]);

  return (
    <div className="App">
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
          path="/products/:id" // Ensure this path matches the link in the Product component
          element={
            <div>
              <ProductDetails />
            </div>
          }
        />
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
