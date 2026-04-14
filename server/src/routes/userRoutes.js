const express = require('express');
const router = express.Router();
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');

router.use(authenticate);

// Admin and above can manage users
router.get('/', authorize(['Super Admin', 'Admin']), getUsers);
router.post('/', authorize(['Super Admin', 'Admin']), createUser);
router.get('/:id', authorize(['Super Admin', 'Admin']), getUserById);
router.put('/:id', authorize(['Super Admin', 'Admin']), updateUser);

// Only Super Admin can delete
router.delete('/:id', authorize(['Super Admin']), deleteUser);

module.exports = router;
