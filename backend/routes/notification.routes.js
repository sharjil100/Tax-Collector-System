const express = require("express");
const { getUserNotifications } = require("../controllers/notification.controller");
const  {authenticate} = require("../middleware/auth.middleware");

const router = express.Router();

console.log('getUserNotifications:', getUserNotifications); // Ensure this function is defined
console.log('authenticate:', authenticate);

router.get("/", authenticate, getUserNotifications);

module.exports = router;
