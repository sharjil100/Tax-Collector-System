// routes/document.routes.js
const express = require('express');
const {authenticate} = require('../middleware/auth.middleware');
const { uploadDocument } = require('../controllers/document.controller');

const router = express.Router();

router.post('/', authenticate, uploadDocument);

module.exports = router;
