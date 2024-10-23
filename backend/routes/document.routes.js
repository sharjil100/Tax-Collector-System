const express = require('express');
const { authenticate } = require('../middleware/auth.middleware');
const { uploadDocument, getDocumentById, getDocumentsForUser } = require('../controllers/document.controller');

const router = express.Router();

// Route to upload document
router.post('/', authenticate, uploadDocument);

// Route to get a document by ID
router.get('/:id', authenticate, getDocumentById);

// Route to get all documents for the authenticated user
router.get('/', authenticate, getDocumentsForUser);  // This is the new route

module.exports = router;
