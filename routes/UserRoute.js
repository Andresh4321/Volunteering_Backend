// routes/users.js
const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');

router.post('/signup', signup);
router.post('/login', login);

// Get user profile
router.get('/profile', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;