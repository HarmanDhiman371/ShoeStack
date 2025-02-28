const db = require("../config/userconfigs");

// Create Order
const createOrder = (userId, totalPrice, items, callback) => {
    const sql = "INSERT INTO orders (user_id, total_price) VALUES (?, ?)";
    db.query(sql, [userId, totalPrice], (err, result) => {
        if (err) return callback(err, null);
        
        const orderId = result.insertId;
        const values = items.map(item => [orderId, item.product_id, item.quantity, item.price]);

        db.query("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?", [values], (err) => {
            if (err) return callback(err, null);
            callback(null, orderId);
        });
    });
};

// Get All Orders
const getAllOrders = (callback) => {
    db.query("SELECT * FROM orders", callback);
};

// Get Order by ID
const getOrderById = (orderId, callback) => {
    db.query("SELECT * FROM orders WHERE id = ?", [orderId], (err, order) => {
        if (err) return callback(err, null);
        if (order.length === 0) return callback(null, null);

        db.query("SELECT * FROM order_items WHERE order_id = ?", [orderId], (err, items) => {
            if (err) return callback(err, null);
            callback(null, { order: order[0], items });
        });
    });
};

// Update Order Status
const updateOrderStatus = (orderId, status, callback) => {
    db.query("UPDATE orders SET status = ? WHERE id = ?", [status, orderId], callback);
};

// Delete Order
const deleteOrder = (orderId, callback) => {
    db.query("DELETE FROM orders WHERE id = ?", [orderId], callback);
};

module.exports = { createOrder, getAllOrders, getOrderById, updateOrderStatus, deleteOrder };
