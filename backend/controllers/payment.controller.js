const Payment = require('../models/Payment.model');
const TaxFiling = require('../models/TaxFilling.model');
const Notification = require('../models/Notification.model'); // Import Notification model

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

    // Create success notification
    const successNotification = new Notification({
      userId: req.user.id,
      notificationType: 'Payment Success',
      message: `Your payment of $${amountPaid} was successful.`,
    });
    await successNotification.save();

    console.log('Payment created successfully:', newPayment);

    res.status(201).json({ payment: newPayment });

  } catch (error) {
    console.error('Error creating payment:', error); 

    // Create failure notification
    const failureNotification = new Notification({
      userId: req.user.id,
      notificationType: 'Payment Failure',
      message: `Your payment of $${req.body.amountPaid} failed. Please try again.`,
    });
    await failureNotification.save();

    res.status(400).json({ message: error.message });
  }
};

const getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.id });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments" });
  }
};

module.exports = { makePayment, getUserPayments };


// dummy payment system with stripe
// npm install stripe
/* 
try {
    // Create a payment intent on Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountPaid * 100,  // Stripe expects amount in cents
      currency: 'usd',
      payment_method_types: [paymentMethod],  // E.g., 'card'
      metadata: { taxFilingId, userId: req.user.id }
    });

    // Confirm the payment intent (for simplicity, assuming payment is confirmed immediately)
    const confirmedPayment = await stripe.paymentIntents.confirm(paymentIntent.id);

    // Log confirmation for faculty demo purposes
    console.log('Stripe Payment Intent confirmed:', confirmedPayment);

    // Create and save the payment record locally in your database
    const newPayment = new Payment({
      userId: req.user.id,
      taxFilingId,
      amountPaid,
      paymentMethod,
      paymentStatus: 'completed',  // Set based on confirmation
      transactionId: confirmedPayment.id,  // Store Stripe's transaction ID
    });

    await newPayment.save();

    Create a Stripe Account: Go to Stripe and sign up for an account if you haven't already.
    Get API Keys:
    After logging in, navigate to Developers > API keys.
    Copy the Publishable key and Secret key from the dashboard.
}
*/
