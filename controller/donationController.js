// File: controllers/donationController.js
const { Donation } = require('../models/User');
const jwt = require('jsonwebtoken');

// Create donation
exports.createDonation = async (req, res) => {
  try {
    const { pinCode, amount, personalMessage } = req.body;
    
    // Optional: Associate with user if logged in
    let userId = null;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
      } catch (err) {
        // Token invalid, continue without associating
      }
    }
    
    // Create donation
    const donation = await Donation.create({
      pinCode,
      amount,
      personalMessage,
      userId
    });
    
    res.status(201).json({
      message: 'Donation processed successfully',
      donation
    });
  } catch (error) {
    console.error('Donation processing error:', error);
    res.status(500).json({ message: 'Error processing donation', error: error.message });
  }
};

// Get all donations (admin only)
exports.getAllDonations = async (req, res) => {
  try {
    // Here, you'd typically check if the user has admin privileges
    // For simplicity, we're just returning all donations
    const donations = await Donation.findAll();
    res.status(200).json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ message: 'Error retrieving donations', error: error.message });
  }
};

// Get user's donations (for logged-in users)
exports.getUserDonations = async (req, res) => {
  try {
    const donations = await Donation.findAll({
      where: { userId: req.user.id }
    });
    
    res.status(200).json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ message: 'Error retrieving donations', error: error.message });
  }
};