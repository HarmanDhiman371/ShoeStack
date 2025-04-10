// require("dotenv").config();
require('dotenv').config();
const cors = require('cors');
const stripe = require('stripe')

const express = require("express");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
app.use(express.json());
app.use(cors());
const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  
app.use("/api/orders", orderRoutes);
app.use("/api", userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payments',  paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
