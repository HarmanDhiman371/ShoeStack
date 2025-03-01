const express = require('express');
const { createPaymentIntent, chargePayment, handleWebhook } = require('../controllers/PaymentController');
const router = express.Router();

// Create a PaymentIntent
router.post('/create-payment-intent', createPaymentIntent);

// Confirm a PaymentIntent
router.post('/charge', chargePayment);

// Handle Stripe Webhooks
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

module.exports = router;