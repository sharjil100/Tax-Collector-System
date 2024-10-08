const express = require("express");
const { getTaxDues } = require("../controllers/tax.controller");
const { authenticate } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/dues", authenticate, getTaxDues);

module.exports = router;
