const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  date: { type: Date, required: true, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
