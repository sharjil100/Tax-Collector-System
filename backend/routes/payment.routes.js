const express = require("express");
const { getPaymentHistory } = require("../controllers/payment.controller");
const { authenticate } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", authenticate, getPaymentHistory);

module.exports = router;
