const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user making the payment
    taxFilingId: { type: mongoose.Schema.Types.ObjectId, ref: 'TaxFiling', required: true }, // Reference to the related tax filing
    amountPaid: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['Credit Card', 'Bank Transfer'], required: true }, // Payment options
    paymentDate: { type: Date, default: Date.now },
    paymentStatus: { type: String, enum: ['Success', 'Failed'], default: 'Success' }
  });
  
  module.exports = mongoose.model('Payment', paymentSchema);
  