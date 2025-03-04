// Import routes
const authRoutes = require('./routes/auth');
const donationRoutes = require('./routes/donations');
const volunteerRoutes = require('./routes/volunteer');

// Use routes
app.use('/api/auth', authRoutes);
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