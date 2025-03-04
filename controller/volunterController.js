// File: controllers/volunteerController.js
const { Volunteer } = require('../models/User');
const jwt = require('jsonwebtoken');

// Create volunteer application
exports.applyVolunteer = async (req, res) => {
  try {
    const { name, email, birthDate, age } = req.body;
    
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
    
    // Create volunteer application
    const volunteer = await Volunteer.create({
      name,
      email,
      birthDate,
      age,
      userId
    });
    
    res.status(201).json({
      message: 'Volunteer application submitted successfully',
      volunteer
    });
  } catch (error) {
    console.error('Volunteer application error:', error);
    res.status(500).json({ message: 'Error submitting application', error: error.message });
  }
};

// Get all volunteer applications (admin only)
exports.getAllVolunteers = async (req, res) => {
  try {
    // Here, you'd typically check if the user has admin privileges
    // For simplicity, we're just returning all volunteers
    const volunteers = await Volunteer.findAll();
    res.status(200).json(volunteers);
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    res.status(500).json({ message: 'Error retrieving volunteers', error: error.message });
  }
};

// Get volunteer applications for logged-in user
exports.getUserVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.findAll({
      where: { userId: req.user.id }
    });
    
    res.status(200).json(volunteers);
  } catch (error) {
    console.error('Error fetching volunteer applications:', error);
    res.status(500).json({ message: 'Error retrieving applications', error: error.message });
  }
};