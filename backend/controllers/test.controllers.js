const Auth = require("../models/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Test register a new user
exports.testRegister = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await Auth.findOne({ username });
        if (existingUser) return res.status(400).json({ message: "User already exists!" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Auth({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "Test user registered successfully!" });
    } catch (error) {
        res.status(400).json({ message: "Error registering test user", error });
    }
};

// Test login user
exports.testLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Auth.findOne({ username });
        if (!user) return res.status(404).json({ message: "Test user not found!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ message: "Error logging in test user", error });
    }
};
