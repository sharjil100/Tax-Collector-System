
const express = require('express');
const { authenticate } = require('../middleware/auth.middleware'); 
const { uploadDocument, getDocumentById } = require('../controllers/document.controller');

const router = express.Router();


router.post('/', authenticate, uploadDocument);
router.get('/:id', authenticate, getDocumentById);


module.exports = router;
