const PaymentHistory = require("../models/paymentHistory.model");

exports.getPaymentHistory = async (req, res) => {
    try {
        const payments = await PaymentHistory.find({ userId: req.userId });
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
