const express = require("express");
const { authenticate } = require("../middleware/auth.middleware"); // Adjust the path as necessary
const {
    registerUser,
    loginUser,
    updateUserProfile,
    getUserProfile,
} = require("../controllers/user.controller"); // Adjust the path as necessary

const router = express.Router();



// Update user profile
router.put("/", authenticate, updateUserProfile);

// Get user profile
router.get("/", authenticate, getUserProfile);

module.exports = router;
