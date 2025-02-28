const db = require('../config/userconfigs');

class Product {
  static getAllProducts(callback) {
    db.query('SELECT * FROM products', (err, results) => {
      if (err) {
        console.error('Error fetching products:', err);
        return callback(err, null);
      }
      return callback(null, results);
    });
  }

  static getProductById(id, callback) {
    db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error('Error fetching product by ID:', err);
        return callback(err, null);
      }
      return callback(null, results.length > 0 ? results[0] : null);
    });
  }

  static addProduct({ name, description, price, stock, category, imageUrl }, callback) {
    db.query(
      'INSERT INTO products (name, description, price, stock, category, imageUrl) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, price, stock, category, imageUrl],
      (err, results) => {
        if (err) {
          console.error('Error adding product:', err);
          return callback(err, null);
        }
        return callback(null, results);
      }
    );
  }

  static updateProduct(id, { name, description, price, stock, category, imageUrl }, callback) {
    db.query(
      'UPDATE products SET name=?, description=?, price=?, stock=?, category=?, imageUrl=? WHERE id=?',
      [name, description, price, stock, category, imageUrl, id],
      (err, results) => {
        if (err) {
          console.error('Error updating product:', err);
          return callback(err, null);
        }
        return callback(null, results);
      }
    );
  }

  static deleteProduct(id, callback) {
    db.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error('Error deleting product:', err);
        return callback(err, null);
      }
      return callback(null, results);
    });
  }
}

module.exports = Product;
