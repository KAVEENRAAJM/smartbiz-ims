const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');

router.use(authenticate);

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', authorize(['Super Admin', 'Admin', 'Manager']), createProduct);
router.put('/:id', authorize(['Super Admin', 'Admin', 'Manager']), updateProduct);
router.delete('/:id', authorize(['Super Admin', 'Admin']), deleteProduct);

module.exports = router;
