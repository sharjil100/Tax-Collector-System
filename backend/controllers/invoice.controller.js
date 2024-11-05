// controllers/invoiceController.js
const Invoice = require("../models/Invoice.model");

// Create a new invoice
exports.createInvoice = async (req, res) => {
    try {
      const { amount, description, status } = req.body;
      const userId = req.user._id; // Retrieve userId from req.user set by middleware
      const invoice = new Invoice({ amount, description, userId, status });
      await invoice.save();
      res.status(201).json({ invoice });
    } catch (error) {
      console.error("Error creating invoice:", error);
      res.status(400).json({ message: "Failed to create invoice", error });
    }
  };
  

// Get all invoices for a specific user
// controllers/invoiceController.js
exports.getInvoices = async (req, res) => {
    try {
      const userId = req.user ? req.user.id : null; // Ensure `userId` is set
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      const invoices = await Invoice.find({ userId });
      res.json({ invoices });
    } catch (error) {
      console.error("Error fetching invoices:", error); // Log error to debug
      res.status(500).json({ message: "Failed to retrieve invoices", error });
    }
  };
  

// Update invoice status
exports.updateInvoiceStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json({ invoice });
  } catch (error) {
    res.status(400).json({ message: "Failed to update invoice", error });
  }
};
