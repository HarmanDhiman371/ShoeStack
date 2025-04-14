const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET ;

exports.signupUser = (req, res) => {
  console.log("Signup request received:", req.body);
  const { name, email, pass } = req.body;

  if (!name || !email || !pass) {
    return res.status(400).send("Name, email, and password are required.");
  }

  User.findByEmail(email, async (err, results) => {
    if (err) return res.status(500).send("An error occurred.");
    if (results.length > 0) return res.status(400).send("User already exists.");

    try 
    {
      const hashedPassword = await bcrypt.hash(pass, 10);
      User.create(name, email, hashedPassword, (err, result) => {
        if (err) {
          console.error("MySQL Insert Error:", err);  // 👈 Add this
          return res.status(500).send("Error registering user.");
        }
        res.status(201).send("User registered successfully!");
      });
      
    } catch (error) {
      res.status(500).send("Failed to hash password.");
    }
  });
};

exports.loginUser = (req, res) => {
  const { email, pass } = req.body;

  if (!email || !pass) {
    return res.status(400).send("Email and password are required.");
  }

  User.findByEmail(email, async (err, results) => {
    if (err) return res.status(500).send("An error occurred.");
    if (results.length === 0) return res.status(404).send("User not found.");

    const user = results[0];

    try {
      const isMatch = await bcrypt.compare(pass, user.pass);
      if (!isMatch) return res.status(401).send("Incorrect password.");

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({ message: "Login successful!", token });
    } catch (err) {
      res.status(500).send("Login failed.");
    }
  });
};

// protected route
exports.getProfile = (req, res) => {
  res.status(200).json({
    message: "Protected route accessed",
    user: req.user, // this is from the verified token
  });
};
