const httpStatus = require('http-status');
const { Orders } = require('../models');
const ApiError = require('../utils/ApiError');

const createOrder = async (orderBody) => {
  return Orders.create(orderBody);
};


module.exports = {
  createOrder,
};
