const Auth = require('../models/auth.model'); // Auth model for authentication
const User = require('../models/user.model'); // User model for user details
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    const { password, name, email, userType } = req.body;  // Remove username from request body

    try {
        // Extract username from the email (portion before '@')
        const username = email.split('@')[0];  // Automatically generate username from email

        // Check if the username already exists in the Auth collection
        let existingAuth = await Auth.findOne({ username });
        if (existingAuth) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Check if the email already exists in the User collection
        let existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new Auth document for authentication with the role (userType)
        const newAuth = new Auth({
            username,
            password: hashedPassword,
            role: userType,  // Assign the role based on the userType from the form
        });

        await newAuth.save();

        // Create a new User document with the associated details
        const newUser = new User({
            username,  // Use the extracted username
            name,
            email,
            userType,  // userType can be either "individual" or "business"
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Extract the username from the email
        const username = email.split('@')[0];

        // Find the user by username, not by email
        const user = await Auth.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
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
