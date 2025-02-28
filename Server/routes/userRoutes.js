const express = require("express");
const { submitUser, signupUser } = require("../controllers/userController");

const router = express.Router();

router.post("/submit", submitUser);
router.post("/signup", signupUser);

module.exports = router;
