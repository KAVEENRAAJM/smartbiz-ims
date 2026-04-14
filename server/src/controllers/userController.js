const { sendResponse } = require('../utils/response');
const { User } = require('../models');
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password_hash'] } });
    sendResponse(res, 200, true, 'Users fetched successfully', { users });
  } catch (error) {
    sendResponse(res, 500, false, 'Server error', null, [error.message]);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password_hash'] } });
    if (!user) return sendResponse(res, 404, false, 'User not found');
    sendResponse(res, 200, true, 'User fetched successfully', { user });
  } catch (error) {
    sendResponse(res, 500, false, 'Server error', null, [error.message]);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    
    // In a real scenario we might send an invite link instead of setting a fixed password.
    const salt = await bcrypt.genSalt(12);
    const password_hash = await bcrypt.hash(password || 'tempPassword123!', salt);

    const newUser = await User.create({ name, email, role, password_hash, is_active: true });
    
    const userToReturn = newUser.toJSON();
    delete userToReturn.password_hash;
    
    sendResponse(res, 201, true, 'User created successfully', { user: userToReturn });
  } catch (error) {
    sendResponse(res, 500, false, 'Failed to create user', null, [error.message]);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, role, is_active } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return sendResponse(res, 404, false, 'User not found');

    if (name) user.name = name;
    if (role) user.role = role;
    if (is_active !== undefined) user.is_active = is_active;

    await user.save();
    
    const updatedUser = user.toJSON();
    delete updatedUser.password_hash;

    sendResponse(res, 200, true, 'User updated successfully', { user: updatedUser });
  } catch (error) {
    sendResponse(res, 500, false, 'Failed to update user', null, [error.message]);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return sendResponse(res, 404, false, 'User not found');
    
    if (user.role === 'Super Admin') {
      return sendResponse(res, 400, false, 'Cannot delete a Super Admin');
    }

    await user.destroy();
    sendResponse(res, 200, true, 'User deleted successfully');
  } catch (error) {
    sendResponse(res, 500, false, 'Failed to delete user', null, [error.message]);
  }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
