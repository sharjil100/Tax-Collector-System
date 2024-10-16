const mongoose = require('mongoose');
const taxfillingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who files the tax
    taxYear: { type: Number, required: true },
    income: { type: Number, required: true },
    deductions: { type: Number, default: 0 },
    calculatedTax: { type: Number }, // Automatically calculated based on income and deductions
    status: { type: String, enum: ['Pending', 'Submitted', 'Paid'], default: 'Pending' }, // Status of the tax filing
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('TaxFilling', taxfillingSchema);
  