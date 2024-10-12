const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authenticate = async (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.header('Authorization')?.split(' ')[1]; // Split to get the token only

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the user by ID from the decoded token
    const user = await User.findById(decoded.id);
    
    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid token. User not found.' });
    }

    // Attach user info to the request object
    req.user = user; 
    next();
  } catch (error) {
    console.error('Token verification error:', error); // Log the error for debugging
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = { authenticate };
