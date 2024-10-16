const Auth = require('../models/auth.model'); // Auth model for authentication
const User = require('../models/user.model'); // User model for user details
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    const { username, password, name, email, userType } = req.body;

    try {
        
        let existingAuth = await Auth.findOne({ username });
        if (existingAuth) {
            return res.status(400).json({ message: 'Username already exists' });
        }

       
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newAuth = new Auth({
            username,
            password: hashedPassword,
        });

        await newAuth.save();

        
        const newUser = new User({
            username,
            name,
            email,
            userType, 
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        
        const user = await Auth.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = { register, login, verifyToken };
