const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { ordersService } = require('../services');

const saveOrder = catchAsync(async (req, res) => {
  const orderData = {
    businessId: req.body.businessId,
    urlKey: req.body.urlKey,
    orderItems: req.body.orderItems,
    totalPrice: req.body.totalPrice,
    discount: req.body.discount,
  };
  const order = await ordersService.createOrder(orderData);
  res.status(httpStatus.CREATED).send({ order, msg: 'Order Created Successful!', status: 200, success: 'Success' });
});

module.exports = {
  saveOrder,
};
