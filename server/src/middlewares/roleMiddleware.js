const { sendResponse } = require('../utils/response');

const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return sendResponse(res, 403, false, 'Forbidden. Insufficient permissions to access this feature.');
    }
    next();
  };
};

module.exports = authorize;
