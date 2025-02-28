import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Payment from "./components/Payment";
import Orders from "./components/Orders";
import { Routes, Route, useLocation } from "react-router-dom";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const promise = loadStripe("pk_live_51Qwx05P5ms7TrF3S6CxhgzDcNgkuluIlO5cBqm6ZoBeL8cVom0BftWkRWm5DnnitqlzQt25nR232csBBmwIeaHIc00SuldkuOI");

function App() {
  const [{}, dispatch] = useStateValue();
  const location = useLocation(); // Get the current location

  useEffect(() => {
    // will only run once when the app component load, kind of like a dynamic if statement in react
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>>", authUser);

      if (authUser) {
        // The user just logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

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
