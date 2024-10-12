// controllers/payment.controller.js
const Payment = require('../models/Payment.model');
const taxfilling = require('../models/TaxFilling.model');

const makePayment = async (req, res) => {
  const { taxfillingId, amountPaid, paymentMethod } = req.body;

  const taxfilling = await taxfilling.findById(taxfillingId);
  if (!taxfilling) return res.status(404).json({ message: 'Tax filing not found.' });

  const payment = new Payment({
    userId: req.user._id,
    taxfillingId,
    amountPaid,
    paymentMethod,
  });

  await payment.save();
  res.status(201).json(payment);
};

module.exports = { makePayment };
