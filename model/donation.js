const Donation = sequelize.define('Donation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    pinCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    personalMessage: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      allowNull: true
    }
  });
  
  // Define relationships
  User.hasMany(Volunteer);
  Volunteer.belongsTo(User);
  
  User.hasMany(Donation);
  Donation.belongsTo(User);
  
  module.exports = { User, Volunteer, Donation };