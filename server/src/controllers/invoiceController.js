const { sendResponse } = require('../utils/response');
const { Invoice, InvoiceItem, Payment, Customer, Product, sequelize } = require('../models');

const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll({
      include: [{ model: Customer, attributes: ['name', 'email'] }]
    });
    sendResponse(res, 200, true, 'Invoices fetched', { invoices });
  } catch (error) {
    sendResponse(res, 500, false, 'Server error', null, [error.message]);
  }
};

const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id, {
      include: [
        { model: Customer, attributes: ['name', 'email', 'phone', 'address'] },
        { model: InvoiceItem, include: [{ model: Product, attributes: ['name'] }] }
      ]
    });
    if (!invoice) return sendResponse(res, 404, false, 'Invoice not found');
    sendResponse(res, 200, true, 'Invoice fetched', { invoice });
  } catch (error) {
    sendResponse(res, 500, false, 'Server error', null, [error.message]);
  }
};

const createInvoice = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { customer_id, items, tax_amount, discount, payment_method, amount_paid } = req.body;
    
    let subtotal = 0;
    const invItemsData = items.map(item => {
      const itemTotal = (item.quantity * item.unit_price) - (item.discount || 0);
      subtotal += itemTotal;
      return { ...item, total: itemTotal };
    });

    const grand_total = subtotal + Number(tax_amount) - Number(discount);
    let payment_status = 'unpaid';
    if (amount_paid >= grand_total) payment_status = 'paid';
    else if (amount_paid > 0) payment_status = 'partial';

    // Auto generate invoice number
    const count = await Invoice.count() + 1;
    const invoice_number = `INV-${new Date().getFullYear()}-${count.toString().padStart(6, '0')}`;

    const invoice = await Invoice.create({
      invoice_number,
      customer_id,
      cashier_id: req.user.id,
      subtotal,
      tax_amount,
      discount,
      grand_total,
      payment_status,
      payment_method
    }, { transaction: t });

    const invoiceItems = invItemsData.map(i => ({ ...i, invoice_id: invoice.id }));
    await InvoiceItem.bulkCreate(invoiceItems, { transaction: t });

    if (amount_paid > 0) {
      await Payment.create({
        invoice_id: invoice.id,
        amount: amount_paid,
        method: payment_method,
        recorded_by: req.user.id
      }, { transaction: t });
    }

    await t.commit();
    sendResponse(res, 201, true, 'Invoice created', { invoice });
  } catch (error) {
    await t.rollback();
    sendResponse(res, 500, false, 'Failed to create invoice', null, [error.message]);
  }
};

module.exports = { getInvoices, getInvoiceById, createInvoice };
