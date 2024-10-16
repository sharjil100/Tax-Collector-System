const express = require("express");
const { register, login, verifyToken } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify", verifyToken, (req, res) => {
    res.status(200).json({ message: "Token is valid", userId: req.userId });
});

module.exports = router;
