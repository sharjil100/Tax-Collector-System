const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  notificationType: { 
    type: String, 
    enum: ['Tax Filing Reminder', 'Payment Reminder', 'Tax Filing Success', 'Tax Filing Failure', 'Payment Success', 'Payment Failure'], 
    required: true 
  },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  sentAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
