// routes/donations.js
const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const { authenticateToken } = require('../middleware/auth');

// Create donation
router.post('/', donationController.createDonation);

// Get all donations (admin only)
router.get('/', authenticateToken, donationController.getAllDonations);

// Get user's donations (for logged-in users)
router.get('/my-donations', authenticateToken, donationController.getUserDonations);

module.exports = router;