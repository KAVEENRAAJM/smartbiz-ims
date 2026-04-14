const express = require('express');
const router = express.Router();
const { getInvoices, getInvoiceById, createInvoice } = require('../controllers/invoiceController');
const authenticate = require('../middlewares/authMiddleware');

router.use(authenticate);

router.get('/', getInvoices);
router.get('/:id', getInvoiceById);
router.post('/', createInvoice);

module.exports = router;
