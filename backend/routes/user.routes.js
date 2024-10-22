const express = require("express");
const { authenticate } = require("../middleware/auth.middleware");
const { updateUserProfile, getUserProfile } = require("../controllers/user.controller");

const router = express.Router();

// Update user profile
router.put("/", authenticate, updateUserProfile);

// Get user profile
router.get("/", authenticate, getUserProfile);

module.exports = router;
