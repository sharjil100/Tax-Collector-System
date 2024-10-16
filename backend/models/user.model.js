const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Link to auth
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    userType: { 
        type: String, 
        required: true, 
        enum: ['individual', 'business'], 
        default: 'individual' 
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
