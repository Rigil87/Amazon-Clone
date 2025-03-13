// Import necessary modules
const { https } = require('firebase-functions/v2'); // Import Firebase functions for handling HTTP requests
const express = require('express'); // Import Express framework for building web applications
require('dotenv').config(); // Load environment variables from .env file
const cors = require('cors'); // Import CORS middleware for handling cross-origin requests
const admin = require('firebase-admin'); // Import Firebase Admin SDK for accessing Firestore

// Load Stripe secret key from environment variables
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY); // Log the Stripe secret key (for debugging purposes)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with the secret key

// Initialize Firebase Admin
admin.initializeApp(); // Initialize Firebase Admin SDK

// Create an Express app
const app = express(); // Create a new Express application

// Apply middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies for all incoming requests

// Define API routes
app.post('/payments/create', async (req, res) => {
  const total = req.query.total; // Retrieve the total amount from the query parameters
  console.log(`Received payment request for amount: ${total}`); // Log the received payment request amount

  // Check if the total amount is valid
  if (!total || isNaN(total)) {
    return res.status(400).send({ error: 'Invalid amount' }); // Send a 400 Bad Request response if the amount is invalid
  }

  try {
    // Create a payment intent with the specified amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(total), // Convert the total amount to an integer (in cents)
      currency: 'usd', // Specify the currency as USD
    });
    console.log(`Payment Intent Created: ${paymentIntent.id}`); // Log the created payment intent ID

    // Send the client secret to the frontend
    res.status(201).send({
      clientSecret: paymentIntent.client_secret, // Include the client secret in the response
    });
  } catch (error) {
    console.error(`Error creating payment intent: ${error.message}`); // Log any error that occurs during payment intent creation
    res.status(500).send({ error: error.message }); // Send a 500 Internal Server Error response with the error message
  }
});

// Export the Express app as a Cloud Function
exports.api = https.onRequest(app); // Export the Express app as a Firebase Cloud Function
