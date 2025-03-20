const { Sequelize } = require('sequelize');

console.log("Starting database connection...");

// Make sure to replace these details based on your actual database information
const sequelize = new Sequelize('Voluntering_website', 'postgres', 'admin123', {
  host: 'localhost',       // Database hostname
  port: 5432,              // PostgreSQL default port
  dialect: 'postgres',     // Dialect is postgres
  logging: console.log,    // Enable query logging (optional)
});

const syncDatabase = async () => {
  try {
    console.log("Attempting to authenticate with the database...");
    await sequelize.authenticate();  // Authenticating the connection to the database
    console.log("✅ Connected to the database successfully!");

    console.log("Syncing database...");
    await sequelize.sync({ alter: true });  // Sync models with the database
    console.log("✅ Database synced successfully!");
  } catch (error) {
    console.error("❌ Error connecting to the database:", error);
  }
};

// Call the function
syncDatabase()
  .then(() => {
    console.log("🔄 Database sync process completed.");
  })
  .catch((err) => {
    console.error("⚠️ Unexpected error:", err);
  });

module.exports = sequelize;
