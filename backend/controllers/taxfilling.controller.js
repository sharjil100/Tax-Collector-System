// controllers/taxfilling.controller.js
const TaxFilling = require('../models/TaxFilling.model');
const User = require('../models/user.model');

const createtaxfilling = async (req, res) => {
  const { taxYear, income, deductions } = req.body;

  // Simple tax calculation logic (modify as needed)
  const calculatedTax = (income - deductions) * 0.2; // 20% tax rate

  const newTaxFilling = new TaxFilling({
    userId: req.user._id,
    taxYear,
    income,
    deductions,
    calculatedTax,
  });

  await newTaxFilling.save();
  res.status(201).json(newTaxFilling);
};

const getUsertaxfillings = async (req, res) => {
  try {
    const filings = await TaxFilling.find({ userId: req.user._id });
    res.json(filings);
  } catch (error) {
    console.error('Error fetching tax filings:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { createtaxfilling, getUsertaxfillings };
