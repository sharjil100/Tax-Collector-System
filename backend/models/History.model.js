
const mongoose = require('mongoose');
const historySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
    actionType: { type: String, enum: ['Tax Filing', 'Payment', 'Document Upload'], required: true },
    referenceId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Reference to the related action (TaxFiling, Payment, or Document)
    actionDate: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('History', historySchema);
  