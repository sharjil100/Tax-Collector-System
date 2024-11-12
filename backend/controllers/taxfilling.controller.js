const TaxFiling = require('../models/TaxFilling.model');
const Document = require('../models/DocumentUpload.model');  

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

  // Validate input fields
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
    // Step 1: Check if tax filing for the same year already exists
    const existingFiling = await TaxFiling.findOne({ userId: req.user._id, taxYear });
    if (existingFiling) {
      return res.status(409).json({ message: 'You have already filed taxes for this year.' });
    }

    // Step 2: Create the tax filing entry
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

    // Step 3: If a file is uploaded, create a document record
    if (file) {
      const documentUrl = `/uploads/${file.filename}`;

      // Save the document in the TaxFiling model
      newTaxFiling.documentName = file.originalname;
      newTaxFiling.documentUrl = documentUrl;
      await newTaxFiling.save();

      // Save the document in the Document model
      const newDocument = new Document({
        userId: req.user._id, // Link to the user
        taxFilingId: newTaxFiling._id, // Link to the newly created tax filing
        documentName: file.originalname,
        documentUrl: documentUrl, // The path to the file
      });
      
      await newDocument.save(); // Save the document record
    }

    console.log("Tax filing created successfully:", newTaxFiling);
    res.status(201).json(newTaxFiling);
  } catch (error) {
    console.error("Error creating tax filing:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createtaxfilling };
