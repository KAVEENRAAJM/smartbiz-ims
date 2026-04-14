const { sendResponse } = require('../utils/response');
const { Inventory, Product, Warehouse, StockMovement, sequelize } = require('../models');

const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findAll({
      include: [
        { model: Product, attributes: ['name', 'sku', 'barcode', 'category_id'] },
        { model: Warehouse, attributes: ['name'] }
      ]
    });
    sendResponse(res, 200, true, 'Inventory fetched', { inventory });
  } catch (error) {
    sendResponse(res, 500, false, 'Server error', null, [error.message]);
  }
};

const getLowStock = async (req, res) => {
  try {
    const inventory = await Inventory.findAll({
      where: sequelize.where(sequelize.col('quantity'), '<=', sequelize.col('reorder_level')),
      include: [{ model: Product, attributes: ['name', 'sku'] }]
    });
    sendResponse(res, 200, true, 'Low stock items fetched', { inventory });
  } catch (error) {
    sendResponse(res, 500, false, 'Server error', null, [error.message]);
  }
};

const addAdjustment = async (req, res) => {
  try {
    const { product_id, warehouse_id, quantity, type, notes } = req.body;

    let invRecord = await Inventory.findOne({ where: { product_id, warehouse_id } });
    if (!invRecord) {
      if (type === 'out') return sendResponse(res, 400, false, 'Insufficient stock');
      invRecord = await Inventory.create({ product_id, warehouse_id, quantity: 0 });
    }

    if (type === 'in') invRecord.quantity += quantity;
    if (type === 'out') invRecord.quantity -= quantity;
    if (type === 'adjustment') invRecord.quantity = quantity;

    if (invRecord.quantity < 0) return sendResponse(res, 400, false, 'Stock cannot be negative');

    await invRecord.save();

    await StockMovement.create({
      product_id,
      type,
      quantity,
      warehouse_id,
      performed_by: req.user.id,
      notes
    });

    sendResponse(res, 200, true, 'Stock adjusted successfully', { inventory: invRecord });
  } catch (error) {
    sendResponse(res, 500, false, 'Server error', null, [error.message]);
  }
};

module.exports = { getInventory, getLowStock, addAdjustment };
