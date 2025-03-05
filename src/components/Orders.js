// Import the necessary React library and other required modules
import React, { useEffect, useState } from 'react';
import '../styles/orders.css'; // Import the CSS file for styling the component
import { db } from '../firebase'; // Import the Firestore database from firebase.js
import { useStateValue } from '../StateProvider'; // Import the useStateValue hook for accessing the global state
import Order from './Order'; // Import the Order component

// Define the Orders functional component
function Orders() {
  const [orders, setOrders] = useState([]); // Initialize the orders state as an empty array

  // Retrieve the basket and user from the global state using the useStateValue hook
  const [{ basket, user }, dispatch] = useStateValue();

  // Use the useEffect hook to handle side effects
  useEffect(() => {
    // If the user is logged in, fetch their orders from Firestore
    if (user) {
      db.collection('users') // Access the 'users' collection
        .doc(user?.uid) // Access the document corresponding to the user's UID
        .collection('orders') // Access the 'orders' collection within the user's document
        .orderBy('created', 'desc') // Order the orders by the 'created' field in descending order
        .onSnapshot(snapshot => (
          // Map over the snapshot documents and set the orders state
          setOrders(snapshot.docs.map(doc => ({
            id: doc.id, // Set the order ID
            data: doc.data(), // Set the order data
          })))
        ));
    } else {
        // If the user is not logged in, set the orders state to an empty array
        setOrders([]);
    }
  },  []);

  return <div className="orders">
    <h1>Your Orders</h1>
    <div className="orders__order">
        {orders?.map(order => (
            <Order order={order} />
        ))}
    </div>
    </div>

}

export default Orders;
