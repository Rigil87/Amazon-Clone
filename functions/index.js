const { onRequest, logger } = require("firebase-functions/v2");
const express = require("express");
require("dotenv").config();

const cors = require("cors");
const functions = require("firebase-functions");

// Ensure your STRIPE_SECRET_KEY is being loaded
console.log("STRIPE_SECRET_KEY:", functions.config().stripe.secret_key);

const stripe = require("stripe")(functions.config().stripe.secret_key);

// APP CONFIG
const app = express();

// MIDDLEWARES
app.use(cors({ origin: "*" }));
app.use(express.json());

// API ROUTES
app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  logger.info(`Received payment request for amount: ${total}`);

  if (!total || isNaN(total)) {
    return res.status(400).send({ error: "Invalid amount" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(total),
      currency: "usd",
    });

    logger.info(`Payment Intent Created: ${paymentIntent.id}`);

    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    logger.error(`Error creating payment intent: ${error.message}`);
    res.status(500).send({ error: error.message });
  }
});

// LISTEN COMMAND
exports.api = onRequest(app);
