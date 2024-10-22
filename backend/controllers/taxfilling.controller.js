const TaxFiling = require('../models/TaxFilling.model');
const Document = require('../models/DocumentUpload.model');  // Assuming you're using a document model

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
  const file = req.file;  // Handle file uploads

  // Log the incoming data for debugging purposes
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

  // Validate required fields
  if (!taxYear || isNaN(taxYear)) {
    console.error("Tax Year is required or invalid");
    return res.status(400).json({ message: "Tax Year is required and must be a number" });
  }
  if (!wages || isNaN(wages)) {
    console.error("Wages is required or invalid");
    return res.status(400).json({ message: "Wages is required and must be a number" });
  }
  if (deductions === undefined || isNaN(deductions)) {
    console.error("Deductions is required or invalid");
    return res.status(400).json({ message: "Deductions must be a number" });
  }

  try {
    // Create a new tax filing document
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

    // If a file was uploaded, handle the document upload
    if (file) {
      const documentUrl = `/uploads/${file.filename}`;
      newTaxFiling.documentName = file.originalname;
      newTaxFiling.documentUrl = documentUrl;
      await newTaxFiling.save();
    }

    console.log("Tax filing created successfully:", newTaxFiling);
    res.status(201).json(newTaxFiling);
  } catch (error) {
    console.error("Error creating tax filing:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createtaxfilling };
