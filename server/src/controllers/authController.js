const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { User } = require('../models');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/token');
const { sendResponse } = require('../utils/response');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return sendResponse(res, 400, false, 'Email and password required');

    const user = await User.findOne({ where: { email } });
    if (!user || !user.is_active) {
      return sendResponse(res, 401, false, 'Invalid credentials or inactive account');
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return sendResponse(res, 401, false, 'Invalid credentials');

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.last_login = new Date();
    await user.save();

    sendResponse(res, 200, true, 'Login successful', {
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      tokens: { accessToken, refreshToken }
    });
  } catch (error) {
    sendResponse(res, 500, false, 'Server error during login', null, [error.message]);
  }
};

const refresh = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return sendResponse(res, 400, false, 'Refresh token required');

    const decoded = verifyRefreshToken(token);
    const user = await User.findByPk(decoded.id);
    if (!user || !user.is_active) return sendResponse(res, 401, false, 'Invalid token or inactive user');

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user); // Rotation

    sendResponse(res, 200, true, 'Tokens refreshed', {
      tokens: { accessToken, refreshToken }
    });
  } catch (error) {
    sendResponse(res, 401, false, 'Invalid refresh token', null, [error.message]);
  }
};

const me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password_hash'] } });
    if (!user) return sendResponse(res, 404, false, 'User not found');
    sendResponse(res, 200, true, 'User profile fetched', { user });
  } catch (error) {
    sendResponse(res, 500, false, 'Server error', null, [error.message]);
  }
};

const logout = (req, res) => {
  // In a real app we'd blocklist the refresh token in Redis
  sendResponse(res, 200, true, 'Logged out successfully');
};

module.exports = { login, refresh, me, logout };
