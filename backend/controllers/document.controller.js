// controllers/document.controller.js
const Document = require('../models/DocumentUpload.model');

const uploadDocument = async (req, res) => {
  const { taxFilingId, documentName, documentUrl } = req.body;

  const document = new Document({
    userId: req.user._id,
    taxFilingId,
    documentName,
    documentUrl,
  });

  await document.save();
  res.status(201).json(document);
};

module.exports = { uploadDocument };
