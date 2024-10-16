const User = require('../models/user.model');
const Auth = require('../models/auth.model'); // Make sure you import this
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    const { username, password, name, email, userType } = req.body; // Ensure userType is included

    
    const existingUser = await Auth.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists.' });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const auth = new Auth({ username, password: hashedPassword });

    try {
        await auth.save();

        
        const user = new User({ username, name, email, userType });
        await user.save();

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


const loginUser = async (req, res) => {
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

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    const { name, email, userType } = req.body; // Get updated data

    try {
        // Update user information
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { name, email, userType },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'User profile updated successfully.', user: updatedUser });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        // Fetch the user's profile
        const userProfile = await User.findById(req.user._id);
        if (!userProfile) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ user: userProfile });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { registerUser, loginUser, updateUserProfile, getUserProfile };
