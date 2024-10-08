const Notification = require("../models/notification.model");

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.userId });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
