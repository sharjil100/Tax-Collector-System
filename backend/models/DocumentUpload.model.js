const mongoose = require('mongoose');
const documentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user uploading the document
    taxFilingId: { type: mongoose.Schema.Types.ObjectId, ref: 'TaxFiling', required: true }, // Reference to the related tax filing
    documentName: { type: String, required: true },
    documentUrl: { type: String, required: true }, // URL or path to the uploaded document
    uploadedAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Document', documentSchema);
  