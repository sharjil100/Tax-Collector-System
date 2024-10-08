const express = require("express");
const { getNotifications } = require("../controllers/notification.controller");
const { authenticate } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", authenticate, getNotifications);

module.exports = router;
