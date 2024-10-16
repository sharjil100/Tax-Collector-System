const express = require("express");
const { getUserNotifications, createNotification } = require("../controllers/notification.controller");
const  {authenticate} = require("../middleware/auth.middleware");

const router = express.Router();

console.log('getUserNotifications:', getUserNotifications); 
console.log('authenticate:', authenticate);

router.get("/", authenticate, getUserNotifications);
router.post("/send", authenticate, createNotification);

module.exports = router;
