
const Notification = require('../models/Notification.model');

const createNotification = async (req, res) => {
  const { notificationType, message } = req.body;

  const notification = new Notification({
    userId: req.user._id,
    notificationType,
    message,
  });

  await notification.save();
  res.status(201).json(notification);
};

const getUserNotifications = async (req, res) => {
  const notifications = await Notification.find({ userId: req.user._id });
  res.json(notifications);
};

module.exports = { createNotification, getUserNotifications };
