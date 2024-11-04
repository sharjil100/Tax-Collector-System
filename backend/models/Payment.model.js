const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    taxFilingId: { type: mongoose.Schema.Types.ObjectId, ref: 'TaxFiling', required: true }, 
    amountPaid: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['Credit Card', 'Bank Transfer', 'BKASH', 'NAGAD'], required: true }, 
    paymentDate: { type: Date, default: Date.now },
    paymentStatus: { type: String, enum: ['Success', 'Failed'], default: 'Success' }
  });
  
  module.exports = mongoose.model('Payment', paymentSchema);
  