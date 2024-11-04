const Payment = require('../models/Payment.model');
const TaxFiling = require('../models/TaxFilling.model');

const makePayment = async (req, res) => {
  const { taxFilingId, amountPaid, paymentMethod } = req.body;

  // Check for missing fields
  if (!taxFilingId || !amountPaid || !paymentMethod) {
    console.error('Missing required fields:', { taxFilingId, amountPaid, paymentMethod });
    return res.status(400).json({ message: 'Required fields are missing.' });
  }

  try {
    // Validate that the tax filing record exists
    const taxFiling = await TaxFiling.findById(taxFilingId);
    if (!taxFiling) {
      return res.status(404).json({ message: 'Tax filing record not found.' });
    }

    // Create new payment record
    const newPayment = new Payment({
      userId: req.user.id,
      taxFilingId,
      amountPaid,
      paymentMethod,
      paymentStatus: 'Success', // assuming payment succeeds
    });

    // Save payment to the database
    await newPayment.save();

    console.log('Payment successfully created:', newPayment);
    res.status(201).json({
      message: 'Payment successful',
      payment: newPayment,
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ message: 'Payment processing failed', error: error.message });
  }
};


module.exports = { makePayment };
