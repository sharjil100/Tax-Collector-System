const express = require("express");
const { testRegister, testLogin } = require("../controllers/test.controllers");

const router = express.Router();

// Test routes
router.post("/test/register", testRegister);
router.post("/test/login", testLogin);

module.exports = router;
