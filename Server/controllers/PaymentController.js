const stripe = require('../config/stripe');
const createPaymentIntent = async (req, res) => {
  const { amount, currency, Name } = req.body;

  if (!amount  || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount. Must be a positive number." });
  }
  if (!currency) {
    return res.status(400).json({ error: "Currency is required." });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      payment_method_types: ['card'],
    });

    console.log('User Name:', Name);
    console.log('PaymentIntent created:', paymentIntent.id);

    res.status(200).json({
      Name: Name,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Error creating PaymentIntent:', error.message);
    res.status(500).json({ error: error.message });
  }
};


// Confirm a PaymentIntent
const chargePayment = async (req, res) => {
  const { paymentIntentId } = req.body;

  if (!paymentIntentId) {
    return res.status(400).json({ error: "PaymentIntent ID is required." });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);

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

module.exports = { createPaymentIntent, chargePayment };