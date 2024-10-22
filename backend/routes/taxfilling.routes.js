const express = require('express');
const { createtaxfilling } = require('../controllers/taxfilling.controller');
const { authenticate } = require('../middleware/auth.middleware');
const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Save files to the uploads folder
  },
  filename: (req, file, cb) => {
    const sanitizedFilename = file.originalname.replace(/[^\w.-]/g, '_').replace(/\s+/g, '_');
    cb(null, `${Date.now()}_${sanitizedFilename}`);
  }
});

// File filter to allow specific file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /doc|docx|pdf|jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = /application\/msword|application\/vnd.openxmlformats-officedocument.wordprocessingml.document|application\/pdf|image\/jpeg|image\/png/.test(file.mimetype);

  console.log('File Extension:', path.extname(file.originalname).toLowerCase());
  console.log('MIME Type:', file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    console.error('File type not allowed');
    cb(new Error('File type not allowed'), false);
  }
};

// Configure multer with file filter and storage
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }  // Limit file size to 5 MB
});

const router = express.Router();

// Route to create a tax filing with file upload
router.post('/', authenticate, upload.single('file'), createtaxfilling);

module.exports = router;
