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

  static addProduct({ name, brand, sizeOptions, color, gender, price, imageUrl }, callback) {
    db.query(
      'INSERT INTO products (name, brand, sizeOptions, color, gender, price, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, brand, sizeOptions, color, gender, price, imageUrl],
      (err, results) => {
        if (err) {
          console.error('Error adding product:', err);
          return callback(err, null);
        }
        return callback(null, results);
      }
    );
  }

  static updateProduct(id, { name, brand, sizeOptions, color, gender, price, imageUrl }, callback) {
    db.query(
      'UPDATE products SET name=?, brand=?, sizeOptions=?, color=?, gender=?, price=?, imageUrl=? WHERE id=?',
      [name, brand, sizeOptions, color, gender, price, imageUrl, id],
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
