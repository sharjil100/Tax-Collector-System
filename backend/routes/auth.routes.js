const express = require("express");
const { register, login, verifyToken } = require("../controllers/auth.controller");

const router = express.Router();

// User registration
router.post("/register", register);

// User login
router.post("/login", login);

// Token verification route
router.get("/verify", verifyToken, (req, res) => {
    res.status(200).json({ message: "Token is valid", userId: req.userId });
});

module.exports = router;
