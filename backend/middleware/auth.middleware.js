const jwt = require('jsonwebtoken');
const Auth = require('../models/auth.model'); 
const User = require('../models/user.model'); 

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        console.log('Access denied. No token provided.');
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decoded:', decoded);

        const authUser = await Auth.findById(decoded.id);
        if (!authUser) {
            console.log('Invalid token. Auth user not found.');
            return res.status(401).json({ message: 'Invalid token. User not found.' });
        }

        const user = await User.findOne({ username: authUser.username });
        if (!user) {
            console.log('User profile not found.');
            return res.status(401).json({ message: 'User profile not found.' });
        }

        req.user = user; // Attach the user to request object
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = { authenticate };
