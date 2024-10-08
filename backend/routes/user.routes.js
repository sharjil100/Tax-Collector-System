const express = require("express");
const { getUserData } = require("../controllers/user.controller");
const { authenticate } = require("../middleware/auth.middleware");

const router = express.Router();

// Protect the route with authentication middleware
router.get("/", authenticate, getUserData);

module.exports = router;
