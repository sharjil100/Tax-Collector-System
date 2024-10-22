const User = require('../models/user.model');
const Auth = require('../models/auth.model');

// Update user profile
const updateUserProfile = async (req, res) => {
    const { name, email, userType } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { name, email, userType },
            { new: true }
        );

        if (!updatedUser) {
            console.log('User not found.');
            return res.status(404).json({ message: 'User not found.' });
        }

        console.log('User profile updated:', updatedUser);
        res.status(200).json({ message: 'User profile updated successfully.', user: updatedUser });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const userProfile = await User.findById(req.user._id);
        if (!userProfile) {
            console.log('User not found.');
            return res.status(404).json({ message: 'User not found.' });
        }

        console.log('User profile fetched:', userProfile);
        res.status(200).json(userProfile);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { updateUserProfile, getUserProfile };
