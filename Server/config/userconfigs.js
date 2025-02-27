const express=require('express');
const app=express();
const mysql = require("mysql2");

const port=3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "hind2525", 
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
  
  app.post('/signup', (req, res) => {
    const { name, email, pass } = req.body;

    // Check if  email already exists
    const checkUserQuery = 'SELECT * FROM user WHERE  email = ?';
    db.query(checkUserQuery, [email], (err, results) => {
        if (err) {
            console.error('Error checking for existing user:', err);
            return res.status(500).send('An error occurred.');
        }

        if (results.length > 0) {
            // User with the same name or email already exists
            return res.status(400).send('User with this name or email already exists.');
        } else {
            // Insert new user into the database
            const insertUserQuery = 'INSERT INTO user (name, email, pass) VALUES (?, ?, ?)';
            db.query(insertUserQuery, [name, email, pass], (err, result) => {
                if (err) {
                    console.error('Error inserting new user:', err);
                    return res.status(500).send('An error occurred.');
                }
                res.status(201).send('User registered successfully!');
            });
        }
    });
});
app.listen(port,()=>
{
    console.log("server running")
})
