const express = require('express');
const router = express.Router();
const { getInventory, getLowStock, addAdjustment } = require('../controllers/inventoryController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');

router.use(authenticate);

router.get('/', getInventory);
router.get('/low-stock', getLowStock);
router.post('/adjustment', authorize(['Super Admin', 'Admin', 'Manager']), addAdjustment);

module.exports = router;
