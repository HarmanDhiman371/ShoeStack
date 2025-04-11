const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/signup", userController.signupUser);
router.post("/login", userController.loginUser);

// Protected route
router.get("/profile", verifyToken, userController.getProfile);

module.exports = router;
