const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');
const { authenticateToken } = require('../middleware/auth');

// Create volunteer application
router.post('/apply', volunteerController.applyVolunteer);

// Get all volunteer applications (admin only)
router.get('/', authenticateToken, volunteerController.getAllVolunteers);

// Get volunteer profile (for logged-in users)
router.get('/my-applications', authenticateToken, volunteerController.getUserVolunteers);

module.exports = router;