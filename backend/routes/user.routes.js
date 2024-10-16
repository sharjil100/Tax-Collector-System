const express = require("express");
const { authenticate } = require("../middleware/auth.middleware"); // Adjust the path as necessary
const {
    registerUser,
    loginUser,
    updateUserProfile,
    getUserProfile,
} = require("../controllers/user.controller"); // Adjust the path as necessary

const router = express.Router();

// User registration (optional if handled in auth)
router.post("/register", registerUser);

// User login (optional if handled in auth)
router.post("/login", loginUser);

// Update user profile
router.put("/", authenticate, updateUserProfile);

// Get user profile
router.get("/", authenticate, getUserProfile);

module.exports = router;
