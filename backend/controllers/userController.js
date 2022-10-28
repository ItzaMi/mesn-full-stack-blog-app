const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

const User = require('../models/User');

/**
 * @desc Register a user
 * @route POST /api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, specialCode } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !specialCode ||
    specialCode !== 'banana'
  ) {
    res.status(400);
    throw new Error('Please fill in all fields');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    res.status(201).json({ _id: user.id, name: user.name, email: user.email });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

/**
 * @desc Authenticate a user
 * @route POST /api/users/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: 'Login User' });
});

/**
 * @desc Get user data
 * @route GET /api/users/me
 * @access Public
 */
const getMe = asyncHandler(async (req, res) => {
  res.json({ message: 'User data' });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
