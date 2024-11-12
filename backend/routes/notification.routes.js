const express = require("express");
const { getUserNotifications, createNotification } = require("../controllers/notification.controller");
const { authenticate } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", authenticate, getUserNotifications);
router.post("/send", authenticate, createNotification);

module.exports = router;
