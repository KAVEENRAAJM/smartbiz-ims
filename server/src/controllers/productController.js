const { sendResponse } = require('../utils/response');
const { Product, Category } = require('../models');
const { Op } = require('sequelize');

const getProducts = async (req, res) => {
  try {
    const { search, category_id, page = 1, limit = 20 } = req.query;
    
    const where = {};
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { sku: { [Op.like]: `%${search}%` } },
        { barcode: { [Op.like]: `%${search}%` } }
      ];
    }
    if (category_id) {
      where.category_id = category_id;
    }

    const offset = (page - 1) * limit;

    const products = await Product.findAndCountAll({
      where,
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      include: [{ model: Category, attributes: ['id', 'name'] }]
    });

    sendResponse(res, 200, true, 'Products fetched successfully', {
      products: products.rows,
      total: products.count,
      page: parseInt(page, 10),
      totalPages: Math.ceil(products.count / limit)
    });
  } catch (error) {
    sendResponse(res, 500, false, 'Server error fetching products', null, [error.message]);
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, attributes: ['id', 'name'] }]
    });
    if (!product) return sendResponse(res, 404, false, 'Product not found');
    sendResponse(res, 200, true, 'Product fetched', { product });
  } catch (error) {
    sendResponse(res, 500, false, 'Server error', null, [error.message]);
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    sendResponse(res, 201, true, 'Product created', { product });
  } catch (error) {
    sendResponse(res, 500, false, 'Failed to create product', null, [error.message]);
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return sendResponse(res, 404, false, 'Product not found');
    
    await product.update(req.body);
    sendResponse(res, 200, true, 'Product updated', { product });
  } catch (error) {
    sendResponse(res, 500, false, 'Failed to update product', null, [error.message]);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return sendResponse(res, 404, false, 'Product not found');
    
    await product.destroy();
    sendResponse(res, 200, true, 'Product deleted');
  } catch (error) {
    sendResponse(res, 500, false, 'Failed to delete product', null, [error.message]);
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
