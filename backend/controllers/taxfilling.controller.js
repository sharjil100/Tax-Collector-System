const TaxFiling = require('../models/TaxFilling.model');
const Document = require('../models/DocumentUpload.model');
const Notification = require('../models/Notification.model');

const createtaxfilling = async (req, res) => {
  const {
    fullName,
    ssn,
    dob,
    address,
    taxYear,
    wages,
    selfEmploymentIncome,
    investmentIncome,
    deductions,
    federalTaxPaid,
    bankAccount,
    bankRouting,
  } = req.body;
  const file = req.file; // Handle file uploads

  console.log('Received data:', {
    fullName,
    ssn,
    dob,
    address,
    taxYear,
    wages,
    selfEmploymentIncome,
    investmentIncome,
    deductions,
    federalTaxPaid,
    bankAccount,
    bankRouting,
    file,
  });

  if (!taxYear || isNaN(taxYear)) {
    return res.status(400).json({ message: "Tax Year is required and must be a number" });
  }
  if (!wages || isNaN(wages)) {
    return res.status(400).json({ message: "Wages is required and must be a number" });
  }
  if (deductions === undefined || isNaN(deductions)) {
    return res.status(400).json({ message: "Deductions must be a number" });
  }

  try {
    // Check if tax filing for the same year already exists
    const existingFiling = await TaxFiling.findOne({ userId: req.user._id, taxYear });
    if (existingFiling) {
      return res.status(409).json({ message: 'You have already filed taxes for this year.' });
    }

    // Create the tax filing entry
    const newTaxFiling = new TaxFiling({
      userId: req.user._id,
      fullName,
      ssn,
      dob,
      address,
      taxYear,
      wages,
      selfEmploymentIncome,
      investmentIncome,
      deductions,
      federalTaxPaid,
      bankAccount,
      bankRouting,
    });

    await newTaxFiling.save();

    // If a file is uploaded, create a document record
    if (file) {
      const documentUrl = `/uploads/${file.filename}`;
      newTaxFiling.documentName = file.originalname;
      newTaxFiling.documentUrl = documentUrl;
      await newTaxFiling.save();

      const newDocument = new Document({
        userId: req.user._id,
        taxFilingId: newTaxFiling._id,
        documentName: file.originalname,
        documentUrl: documentUrl,
      });
      await newDocument.save();
    }

    // Create success notification
    console.log("Attempting to create success notification...");
    const successNotification = new Notification({
      userId: req.user._id,
      notificationType: 'Tax Filing Success',
      message: `Your tax filing for the year ${taxYear} was successful.`,
    });
    await successNotification.save();
    console.log("Notification created successfully:", successNotification);

    console.log("Tax filing created successfully:", newTaxFiling);
    res.status(201).json(newTaxFiling);
  } catch (error) {
    console.error("Error creating tax filing:", error);

    // Create failure notification
    const failureNotification = new Notification({
      userId: req.user._id,
      notificationType: 'Tax Filing Failure',
      message: `Your tax filing for the year ${req.body.taxYear} failed. Please try again.`,
    });
    await failureNotification.save();

    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createtaxfilling };
