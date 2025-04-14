import React, { useState } from 'react';
import './LoginPage.css'; // Add your CSS for login page here

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    pass: ""
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const toggleForm = () => {
    setForm({ name: "", email: "", pass: "" });
    setMessage("");
    setIsSignup(!isSignup);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignup ? "/api/signup" : "/api/login";  // Updated endpoint to match your backend

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {  // Your backend server URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsError(true);
        setMessage(data || "Something went wrong.");
        return;
      }

      setIsError(false);
      setMessage(isSignup ? "Signup successful!" : "Login successful!");

      if (!isSignup) {
        // On successful login, store JWT token in localStorage
        localStorage.setItem("authToken", data.token);
        setTimeout(() => {
          window.location.href = "/products"; // Redirect to a protected route or home page
        }, 1500);
      }
    } catch (err) {
      setIsError(true);
      setMessage("Failed to connect to backend.");
    }
  };

  return (
    <div className="login-container">
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="pass"
          placeholder="Password"
          value={form.pass}
          onChange={handleChange}
          required
        />
        <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
      </form>

      {message && (
        <div className={`notification ${isError ? "error" : ""}`}>{message}</div>
      )}

      <div className="toggle" onClick={toggleForm}>
        {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
      </div>
    </div>
  );
};

export default LoginPage;
