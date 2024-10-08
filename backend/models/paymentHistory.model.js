const mongoose = require("mongoose");

const paymentHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    method: { type: String, required: true }, // e.g., credit card, bank transfer
}, { timestamps: true });

module.exports = mongoose.model("PaymentHistory", paymentHistorySchema);
