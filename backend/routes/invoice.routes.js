// routes/invoiceRoutes.js
const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoice.controller");

router.get("/", invoiceController.getInvoices); // GET all invoices for a user
router.post("/", invoiceController.createInvoice); // POST to create a new invoice
router.put("/:id", invoiceController.updateInvoiceStatus); // PUT to update invoice status

module.exports = router;
