
const Document = require('../models/DocumentUpload.model');

const uploadDocument = async (req, res) => {
    const { taxFilingId, documentName, documentUrl } = req.body;

    // Validate required fields
    if (!taxFilingId || !documentName || !documentUrl) {
        return res.status(400).json({ message: 'taxFilingId, documentName, and documentUrl are required.' });
    }

    const document = new Document({
        userId: req.user._id, 
        taxFilingId,
        documentName,
        documentUrl,
    });

    try {
        await document.save();
        res.status(201).json(document);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const getDocumentById = async (req, res) => {
  const { id } = req.params;

  try {
      const document = await Document.findById(id).populate('userId taxFilingId'); 
      if (!document) {
          return res.status(404).json({ message: 'Document not found' });
      }
      res.status(200).json(document);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { uploadDocument, getDocumentById };
