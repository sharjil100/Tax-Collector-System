const mongoose = require("mongoose");

const taxFilingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fullName: { type: String, required: true },
  ssn: { type: String, required: true },  // Social Security Number
  dob: { type: Date, required: true },  // Date of birth
  address: { type: String, required: true },
  taxYear: { type: Number, required: true },  // Added Tax Year
  wages: { type: Number, required: true },  // Wages
  selfEmploymentIncome: { type: Number, default: 0 },  // Self-employment income
  investmentIncome: { type: Number, default: 0 },  // Investment income
  deductions: { type: Number, default: 0 },  // Deductions
  federalTaxPaid: { type: Number, default: 0 },  // Federal tax paid
  bankAccount: { type: String, required: true },  // Bank account number
  bankRouting: { type: String, required: true },  // Bank routing number
  createdAt: { type: Date, default: Date.now },  // Timestamp for creation
  documentName: { type: String },  // Supporting document file name
  documentUrl: { type: String }  // Supporting document file URL
});

module.exports = mongoose.model("TaxFiling", taxFilingSchema);
