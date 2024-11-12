const Notification = require('../models/Notification.model');

const createNotification = async (req, res) => {
  const { notificationType, message } = req.body;

  try {
    const notification = new Notification({
      userId: req.user._id,
      notificationType,
      message,
    });

    await notification.save();
    console.log("Notification created successfully:", notification);
    res.status(201).json(notification);
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ message: "Failed to create notification" });
  }
};

const getUserNotifications = async (req, res) => {
  try {
    console.log("Fetching notifications for user ID:", req.user._id);
    const notifications = await Notification.find({ userId: req.user._id });
    console.log("Notifications fetched:", notifications);
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

module.exports = { createNotification, getUserNotifications };
