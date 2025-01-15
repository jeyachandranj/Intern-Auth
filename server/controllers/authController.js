const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

const signup = async (req, res) => {
  try {
    const {
      accountType,
      firstName,
      lastName,
      fullName,
      companyName,
      industryField,
      employeeCount,
      email,
      password
    } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const userData = {
      accountType,
      email,
      password
    };

    if (accountType === 'Personal') {
      userData.firstName = firstName;
      userData.lastName = lastName;
    } else {
      userData.fullName = fullName;
      userData.companyName = companyName;
      userData.industryField = industryField;
      userData.employeeCount = employeeCount;
    }

    const user = await User.create(userData);

    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        accountType: user.accountType,
        token: generateToken(user._id)
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: user._id,
      email: user.email,
      accountType: user.accountType,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { signup, login };
