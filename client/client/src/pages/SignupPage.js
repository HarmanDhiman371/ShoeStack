import React, { useState } from 'react';
import './SignupPage.css';

const SignupPage = () => {
  const [form, setForm] = useState({ name: "", email: "", pass: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.text(); // Using .text() because your server might return plain text

      if (!res.ok) {
        setIsError(true);
        setMessage(data || "Something went wrong.");
        return;
      }

      setIsError(false);
      setMessage("Signup successful! Please login.");
      setTimeout(() => (window.location.href = "/login"), 2000); // Redirect after success
    } catch (err) {
      setIsError(true);
      setMessage("Failed to connect to backend.");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="signup-input"
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            className="signup-input"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="signup-input"
            type="password"
            name="pass"
            placeholder="Password"
            value={form.pass}
            onChange={handleChange}
            required
          />
          <button className="signup-button" type="submit">Sign Up</button>
        </form>
        {message && <div className={`notification ${isError ? "error" : "success"}`}>{message}</div>}
        <div className="toggle"><a href="/login">Already have an account? Login</a></div>
      </div>
    </div>
  );
};

export default SignupPage;
