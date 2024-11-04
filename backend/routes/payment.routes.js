// routes/payment.routes.js
const express = require('express');
const {authenticate} = require('../middleware/auth.middleware');
const { makePayment } = require('../controllers/payment.controller');
const { getUserPayments } = require('../controllers/payment.controller');

console.log('authenticate:', typeof authenticate); 
console.log('makePayment:', typeof makePayment); 

const router = express.Router();

router.post('/', authenticate, (req, res, next) => {
    console.log('Payment route accessed:', req.body); 
    next(); 
  }, makePayment);
router.get('/user', authenticate, getUserPayments);

module.exports = router;
