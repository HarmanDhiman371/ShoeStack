const stripe = require('../config/stripe');

// Create a PaymentIntent
const createPaymentIntent = async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
    });

    console.log('PaymentIntent created:', paymentIntent.id);

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id, // Include the PaymentIntent ID
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Confirm a PaymentIntent
const chargePayment = async (req, res) => {
  const { paymentIntentId } = req.body; // Use paymentIntentId to confirm the payment

  try {
    // Step 1: Create a PaymentMethod using the test token
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        token: 'tok_visa', // Use the test token
      },
    });

    console.log('PaymentMethod created:', paymentMethod.id);

    // Step 2: Confirm the PaymentIntent with the PaymentMethod ID
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethod.id, // Use the PaymentMethod ID
    });

    if (paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded:', paymentIntent.id);
      res.status(200).json({
        success: true,
        message: 'Payment completed successfully!',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment failed.',
      });
    }
  } catch (error) {
    console.error('Error confirming payment:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Handle Stripe Webhooks
const handleWebhook = (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      console.log('Webhook: Payment succeeded:', paymentIntent.id);
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

module.exports = { createPaymentIntent, chargePayment, handleWebhook };