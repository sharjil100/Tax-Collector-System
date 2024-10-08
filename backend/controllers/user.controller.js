const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.getUserData = async (req, res) => {
    try {
        // Get token from authorization header
        const token = req.headers.authorization.split(" ")[1]; // Assuming "Bearer token"
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user by ID from the token
        const user = await User.findById(decoded.userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Exclude password from response
        const { password, ...userData } = user._doc;
        res.json(userData);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
