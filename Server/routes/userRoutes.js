const express = require("express");
const { submitUser, signupUser,loginUser } = require("../controllers/userController");

const router = express.Router();

router.post("/submit", submitUser);
router.post("/signup", signupUser);
router.post("/login", loginUser);

module.exports = router;
