// require("dotenv").config();
require('dotenv').config();
const cors = require('cors');

const express = require("express");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/orders", orderRoutes);
app.use("/api", userRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
