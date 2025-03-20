// controllers/userController.js
const { User } = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  const { name, email, password, phone, interest } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      interest
    });

    // Remove password from response
    const userData = user.toJSON();
    delete userData.password;

    res.status(201).json({ 
      message: 'User registered successfully', 
      user: userData 
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user.id }, 
      process.env.JWT_SECRET || 'your_secret_key', 
      { expiresIn: '1h' }
    );

    // Remove password from response
    const userData = user.toJSON();
    delete userData.password;

    res.json({ 
      message: 'Login successful', 
      token, 
      user: userData 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
};

module.exports = { signup, login };