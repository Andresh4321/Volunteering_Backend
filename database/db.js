const { Sequelize } = require('sequelize');

console.log("Starting database connection...");

const sequelize = new Sequelize('Volunteering_website', 'postgre', 'admin123', {
  host: 'localhost',
  dialect: 'postgres',
  logging: console.log, // Enable query logging
});

const syncDatabase = async () => {
  try {
    console.log("Attempting to authenticate with the database...");
    await sequelize.authenticate();
    console.log("✅ Connected to the database successfully!");

    console.log("Syncing database...");
    await sequelize.sync({ alter: true });
    console.log("✅ Database synced successfully!");
  } catch (error) {
    console.error("❌ Error connecting to the database:", error);
  }
};

// Call the function
syncDatabase().then(() => {
  console.log("🔄 Database sync process completed.");
}).catch((err) => {
  console.error("⚠️ Unexpected error:", err);
});

module.exports = sequelize;
