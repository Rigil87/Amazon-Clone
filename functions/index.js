// Import necessary modules
const {https} = require('firebase-functions/v2');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const admin = require('firebase-admin');

// Load Stripe secret key from environment variables
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY);
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Initialize Firebase Admin
admin.initializeApp();

// Create an Express app
const app = express();

// Apply middleware
app.use(cors({origin: true}));
app.use(express.json());

// Define API routes
app.post('/payments/create', async (req, res) => {
  const total = req.query.total;
  console.log(`Received payment request for amount: ${total}`);

  if (!total || isNaN(total)) {
    return res.status(400).send({error: 'Invalid amount'});
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(total),
      currency: 'usd',
    });
    console.log(`Payment Intent Created: ${paymentIntent.id}`);
    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(`Error creating payment intent: ${error.message}`);
    res.status(500).send({error: error.message});
  }
});

// Export the Express app as a Cloud Function
exports.api = https.onRequest(app);
