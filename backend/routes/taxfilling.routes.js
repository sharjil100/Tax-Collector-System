// routes/taxfilling.routes.js
const express = require('express');
const { createtaxfilling, getUsertaxfillings } = require('../controllers/taxfilling.controller');
const {authenticate} = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', authenticate, createtaxfilling);
router.get('/', authenticate, getUsertaxfillings);

module.exports = router;
