// File: controllers/userController.js
const { User } = require('../models/User');
const bcrypt = require('bcrypt');

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    // In a production app, you would check for admin privileges here
    // For example: if (!req.user.isAdmin) return res.status(403).json({message: 'Forbidden'});
    
    const users = await User.findAll({
      attributes: { exclude: ['password'] } // Never send passwords
    });
    
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error retrieving users', error: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Only allow users to access their own profile or admins to access any profile
    if (req.user.id !== parseInt(id)) {
      // In production, check if admin: if (!req.user.isAdmin)
      return res.status(403).json({ message: 'Not authorized to access this profile' });
    }
    
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error retrieving user', error: error.message });
  }
};

// Update user profile
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    
    // Only allow users to update their own profile
    if (req.user.id !== parseInt(id)) {
      return res.status(403).json({ message: 'Not authorized to update this profile' });
    }
    
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update fields
    if (username) user.username = username;
    if (email) user.email = email;
    
    await user.save();
    
    res.status(200).json({
      message: 'User updated successfully',
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// Change user password
exports.changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;
    
    // Only allow users to change their own password
    if (req.user.id !== parseInt(id)) {
      return res.status(403).json({ message: 'Not authorized to change this password' });
    }
    
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Verify current password
    const isValidPassword = await user.validPassword(currentPassword);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update password
    user.password = hashedPassword;
    await user.save();
    
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Error changing password', error: error.message });
  }
};

// Delete user account
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Only allow users to delete their own account
    if (req.user.id !== parseInt(id)) {
      return res.status(403).json({ message: 'Not authorized to delete this account' });
    }
    
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    await user.destroy();
    
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting account', error: error.message });
  }
};