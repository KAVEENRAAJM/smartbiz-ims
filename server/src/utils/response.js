const sendResponse = (res, statusCode, success, message, data = null, errors = null) => {
  const payload = { success, message };
  if (data) payload.data = data;
  if (errors) payload.errors = errors;
  return res.status(statusCode).json(payload);
};

module.exports = { sendResponse };
