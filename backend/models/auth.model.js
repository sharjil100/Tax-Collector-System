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
        enum: ["user", "admin"],
        default: "user",
    },
}, { timestamps: true });

module.exports = mongoose.model("Auth", AuthSchema);
