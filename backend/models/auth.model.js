// models/auth.model.js
const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: { 
        type: String, 
        required: true, 
        enum: ['individual', 'business'], // Role is either individual or business
        default: 'individual' 
    },
    
}, { timestamps: true });

module.exports = mongoose.model("Auth", AuthSchema);
