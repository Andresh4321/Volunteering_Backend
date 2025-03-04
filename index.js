// File: server.js (updated)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: false
  }
);

// Import routes

const userRoutes = require('./routes/users');
const donationRoutes = require('./routes/donations');
const volunteerRoutes = require('./routes/volunteers');

// Use routes

app.use('/api/users', userRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/volunteers', volunteerRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Volunteer Application API');
});

// Server startup
const PORT = process.env.PORT || 5000;

// Initialize database and start server
const initializeApp = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Sync all models
    await sequelize.sync();
    console.log('All models were synchronized successfully.');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

initializeApp();

module.exports = { sequelize };