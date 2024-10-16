const jwt = require('jsonwebtoken');
const Auth = require('../models/auth.model'); 
const User = require('../models/user.model'); 

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        
        const authUser = await Auth.findById(decoded.id);
        if (!authUser) {
            return res.status(401).json({ message: 'Invalid token. User not found.' });
        }

        
        const user = await User.findOne({ username: authUser.username });
        if (!user) {
            return res.status(401).json({ message: 'User profile not found.' });
        }

        req.user = user; 
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = { authenticate };
