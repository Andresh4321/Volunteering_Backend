// routes/users.js
const express = require('express');
const router = express.Router();

// Sample route for testing
router.get('/', (req, res) => {
  res.send('User route working!');
});

module.exports = router;  // ✅ Correctly exporting the router
