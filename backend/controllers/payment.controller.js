const Payment = require('../models/Payment.model');
const TaxFiling = require('../models/TaxFilling.model');

const makePayment = async (req, res) => {
  
  console.log('Received payment request:', req.body);
  
  const { taxFilingId, amountPaid, paymentMethod } = req.body;

  
  if (!taxFilingId || !amountPaid || !paymentMethod) {
    console.error('Missing required fields:', { taxFilingId, amountPaid, paymentMethod });
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    
    console.log('User ID from request:', req.user.id);

    const newPayment = new Payment({
      userId: req.user.id, 
      taxFilingId,         
      amountPaid,          
      paymentMethod        
    });

    
    await newPayment.save();

    
    console.log('Payment created successfully:', newPayment);

    
    res.status(201).json(newPayment);
  } catch (error) {
   
    console.error('Error creating payment:', error); 
    res.status(400).json({ message: error.message });
  }
};

module.exports = { makePayment };
