const express = require('express');
const { registerUser, loginUser } = require('../controllers/user.controller');

const router = express.Router();

console.log('registerUser:', registerUser); // Debugging log
console.log('loginUser:', loginUser); // Debugging log

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
