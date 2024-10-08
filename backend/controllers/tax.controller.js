const TaxDues = require("../models/taxDues.model");

exports.getTaxDues = async (req, res) => {
    try {
        const dues = await TaxDues.find({ userId: req.userId });
        res.json(dues);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Implement similar methods for adding and updating tax dues if needed
