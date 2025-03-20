const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');  // ✅ Importing users route correctly
const donationRoutes = require('./routes/donations');
const volunteerRoutes = require('./routes/volunteers');

// Import the sequelize instance (ensure the correct path to your db configuration)
const sequelize = require('./database/db');  // ✅ Import sequelize from your db config

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);  // ✅ Using the users route correctly
app.use('/api/donations', donationRoutes);
app.use('/api/volunteers', volunteerRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Volunteer Application API');
});

// Server startup
const PORT = process.env.PORT || 5000;

// Initialize the app and start the server
const initializeApp = async () => {
  try {
    // Test database connection (if required)
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Sync models with the database
    await sequelize.sync();
    console.log('All models were synchronized successfully.');
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

initializeApp();
