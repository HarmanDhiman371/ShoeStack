const express=require('express');
const app=express();
const mysql = require("mysql2");

const port=3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Brookyln@99", 
    database: "userdata",
});
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL Database");
    }
});
app.post('/submit', (req, res) => {
    const { name, email, pass } = req.body;
  
    // Check if all required fields are provided
    if (!name || !email || !pass) {
      res.status(400).send('Name, email, and password are required.');
      return;
    }
  
    const sql = 'INSERT INTO user (name, email, pass) VALUES (?, ?, ?)';
    db.query(sql, [name, email, pass], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err.message);
        res.status(500).send('An error occurred while registering the user.');
        return;
      }
      res.status(201).send('User registered successfully!');
    });
  });
  
app.listen(port,()=>
{
    console.log("server running")
})
module.exports = db;