const express = require('express');
const router = express.Router();
const { login, refresh, me, logout } = require('../controllers/authController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/me', authenticate, me);

module.exports = router;
