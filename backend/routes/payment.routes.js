// routes/payment.routes.js
const express = require('express');
const {authenticate} = require('../middleware/auth.middleware');
const { makePayment } = require('../controllers/payment.controller');

console.log('authenticate:', typeof authenticate); // Should log 'function'
console.log('makePayment:', typeof makePayment); // Should log 'function'

const router = express.Router();

router.post('/', authenticate, makePayment);

module.exports = router;
