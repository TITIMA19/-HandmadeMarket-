const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret';

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Only allow admin registration if name === 'admin' or 'tazrart'
  let userRole = 'client';
  if (role === 'admin' && (name === 'admin' || name === 'tazrart')) {
    userRole = 'admin';
  } else if (role === 'admin') {
    return res.status(403).json({ message: 'Admin registration forbidden' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ name, email, password: hashedPassword, role: userRole });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ message: 'Email exists or error', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, role: user.role, name: user.name });
};
