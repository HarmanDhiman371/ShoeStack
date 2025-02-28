const Product = require('../models/productModel');

exports.getAllProducts = (req, res) => {
  Product.getAllProducts((err, products) => {
    if (err) return res.status(500).json({ error: 'Error fetching products' });
    res.json(products);
  });
};

exports.getProductById = (req, res) => {
  const { id } = req.params;
  Product.getProductById(id, (err, product) => {
    if (err) return res.status(500).json({ error: 'Error fetching product' });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  });
};

exports.addProduct = (req, res) => {
  const newProduct = req.body;
  Product.addProduct(newProduct, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error adding product' });
    res.status(201).json({ message: 'Product added successfully' });
  });
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  Product.updateProduct(id, updatedProduct, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error updating product' });
    res.json({ message: `Product with ID ${id} updated` });
  });
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  Product.deleteProduct(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error deleting product' });
    res.json({ message: `Product with ID ${id} deleted` });
  });
};
