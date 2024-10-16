const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user receiving the notification
    notificationType: { type: String, enum: ['Tax Filing Reminder', 'Payment Reminder'], required: true }, // Types of notifications
    message: { type: String, required: true },
    read: { type: Boolean, default: false }, 
    sentAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Notification', notificationSchema);
  