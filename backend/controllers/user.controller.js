// controllers/user.controller.js
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { name, email, password, userType } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = new User({ name, email, password: hashedPassword, userType });
  await user.save();

  res.status(201).json({ message: 'User registered successfully!' });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid credentials.' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

console.log('registerUser defined:', !!registerUser);
console.log('loginUser defined:', !!loginUser)

module.exports = { registerUser, loginUser };
