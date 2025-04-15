import React, { useState } from 'react';
import './loginpage.css';

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", pass: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsError(true);
        setMessage(data?.message || "Something went wrong.");
        return;
      }

      localStorage.setItem("authToken", data.token);
      setIsError(false);
      setMessage("Login successful!");
      setTimeout(() => (window.location.href = "/products"), 1500);
    } catch (err) {
      setIsError(true);
      setMessage("Failed to connect to backend.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input 
            className="login-input"
            type="email" 
            name="email" 
            placeholder="Email" 
            value={form.email} 
            onChange={handleChange} 
            required 
          />
          <input 
            className="login-input"
            type="password" 
            name="pass" 
            placeholder="Password" 
            value={form.pass} 
            onChange={handleChange} 
            required 
          />
          <button className="login-button" type="submit">Login</button>
        </form>

        {message && (
          <div className={`notification ${isError ? "error" : "success"}`}>
            {message}
          </div>
        )}

        <div className="toggle">
          <a className="toggle-link" href="/signup">
            Don't have an account? Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
