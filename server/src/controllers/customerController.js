const { sendResponse } = require('../utils/response');
const { Customer } = require('../models');

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    sendResponse(res, 200, true, 'Customers fetched', { customers });
  } catch (error) {
    sendResponse(res, 500, false, 'Server error', null, [error.message]);
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return sendResponse(res, 404, false, 'Customer not found');
    sendResponse(res, 200, true, 'Customer fetched', { customer });
  } catch (error) {
    sendResponse(res, 500, false, 'Server error', null, [error.message]);
  }
};

const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    sendResponse(res, 201, true, 'Customer created', { customer });
  } catch (error) {
    sendResponse(res, 500, false, 'Failed to create customer', null, [error.message]);
  }
};

const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return sendResponse(res, 404, false, 'Customer not found');
    await customer.update(req.body);
    sendResponse(res, 200, true, 'Customer updated', { customer });
  } catch (error) {
    sendResponse(res, 500, false, 'Failed to update customer', null, [error.message]);
  }
};

module.exports = { getCustomers, getCustomerById, createCustomer, updateCustomer };
