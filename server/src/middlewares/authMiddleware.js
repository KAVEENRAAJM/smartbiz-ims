const { verifyAccessToken } = require('../utils/token');
const { sendResponse } = require('../utils/response');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendResponse(res, 401, false, 'No token provided, unauthorized.');
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded; // { id, role }
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return sendResponse(res, 401, false, 'Token expired', null, ['TOKEN_EXPIRED']);
    }
    return sendResponse(res, 401, false, 'Invalid token, unauthorized.');
  }
};

module.exports = authenticate;
