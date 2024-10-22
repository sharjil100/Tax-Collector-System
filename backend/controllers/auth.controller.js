const Auth = require('../models/auth.model'); 
const User = require('../models/user.model'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
const register = async (req, res) => {
    const { password, name, email, userType } = req.body; 

    try {
        // Extract username from email
        const username = email.split('@')[0];

        // Check if the username exists
        let existingAuth = await Auth.findOne({ username });
        if (existingAuth) {
            console.log('Username already exists.');
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Check if the email already exists
        let existingEmail = await User.findOne({ email });
        if (existingEmail) {
            console.log('Email already exists.');
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create Auth and User entries
        const newAuth = new Auth({
            username,
            password: hashedPassword,
            role: userType,
        });

        await newAuth.save();

        const newUser = new User({
            username,
            name,
            email,
            userType,
        });

        await newUser.save();

        console.log('User registered successfully.');
        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login an existing user
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const username = email.split('@')[0];
        const user = await Auth.findOne({ username });
        if (!user) {
            console.log('Invalid email or password.');
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid email or password.');
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log('User logged in successfully.');
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Verify token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        console.log('No token provided.');
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.log('Invalid token.');
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = { register, login, verifyToken };
