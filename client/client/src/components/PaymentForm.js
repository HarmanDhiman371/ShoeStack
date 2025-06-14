import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "../styles/CheckoutForm.css"; 

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!stripe || !elements) return;

    try {
      const response = await fetch("http://localhost:5000/api/payments/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          currency: "usd",
          Name: name,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create payment intent");

      const { clientSecret } = data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name, email },
        },
      });

      if (result.error) {
        setErrorMessage(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setPaymentSuccess(true);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="payment-container">
      <h2>💳 Secure Payment</h2>
      {paymentSuccess ? (
        <h3 className="success-message">✅ Payment Successful! 🎉</h3>
      ) : (
        <form onSubmit={handleSubmit} className="payment-form">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Amount (in USD)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <div className="card-element-container">
            <CardElement />
          </div>
          <button type="submit" disabled={!stripe} className="pay-button">
            Pay Now
          </button>
        </form>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

const PaymentForm = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default PaymentForm;
