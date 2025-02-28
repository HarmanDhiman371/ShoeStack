const User = require("../models/userModel");

exports.submitUser = (req, res) => {
  const { name, email, pass } = req.body;

  if (!name || !email || !pass) {
    return res.status(400).send("Name, email, and password are required.");
  }

  User.create(name, email, pass, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err.message);
      return res.status(500).send("An error occurred while registering the user.");
    }
    res.status(201).send("User registered successfully!");
  });
};

exports.signupUser = (req, res) => {
  const { name, email, pass } = req.body;

  User.findByEmail(email, (err, results) => {
    if (err) {
      console.error("Error checking for existing user:", err);
      return res.status(500).send("An error occurred.");
    }

    if (results.length > 0) {
      return res.status(400).send("User with this email already exists.");
    }

    User.create(name, email, pass, (err, result) => {
      if (err) {
        console.error("Error inserting new user:", err);
        return res.status(500).send("An error occurred.");
      }
      res.status(201).send("User registered successfully!");
    });
  });
};
exports.loginUser = (req, res) => {
    const { email, pass } = req.body;
  
    if (!email || !pass) {
      return res.status(400).send("Email and password are required.");
    }
  
    User.findByEmail(email, (err, results) => {
      if (err) {
        console.error("Error checking user:", err);
        return res.status(500).send("An error occurred.");
      }
  
      if (results.length === 0) {
        return res.status(404).send("User not found.");
      }
  
      // Check if password matches
      if (results[0].pass !== pass) {
        return res.status(401).send("Incorrect password.");
      }
  
      res.status(200).send("Login successful!");
    });
  };
  
