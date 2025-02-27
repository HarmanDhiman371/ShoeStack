const Order = require("../models/orderModel");

// Create Order
exports.createOrder = (req, res) => {
    const { user_id, total_price, items } = req.body;
    if (!user_id || !total_price || !items) return res.status(400).json({ error: "All fields are required" });

    Order.createOrder(user_id, total_price, items, (err, orderId) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: "Order placed successfully", orderId });
    });
};

// Get All Orders
exports.getAllOrders = (req, res) => {
    Order.getAllOrders((err, orders) => {
        if (err) return res.status(500).json(err);
        res.json(orders);
    });
};

// Get Order by ID
exports.getOrderById = (req, res) => {
    const orderId = req.params.id;
    Order.getOrderById(orderId, (err, order) => {
        if (err) return res.status(500).json(err);
        if (!order) return res.status(404).json({ error: "Order not found" });
        res.json(order);
    });
};

// Update Order Status
exports.updateOrderStatus = (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: "Status is required" });

    Order.updateOrderStatus(orderId, status, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Order status updated successfully" });
    });
};

// Delete Order
exports.deleteOrder = (req, res) => {
    const orderId = req.params.id;
    Order.deleteOrder(orderId, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Order deleted successfully" });
    });
};
