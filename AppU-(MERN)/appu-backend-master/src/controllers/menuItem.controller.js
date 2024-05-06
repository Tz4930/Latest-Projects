const httpStatus = require('http-status');
const { ObjectId } = require('mongodb');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { menuItemService } = require('../services');

const menuItemRegister = catchAsync(async (req, res) => {
  const categoriesId = new ObjectId(req.body.categoriesId);
  const menuItemList = {
    categoriesId,
    name: req.body.name,
    description: req.body.description,
    categories: req.body.categories,
    image: req.body.image,
    price: req.body.price,
    sort: req.body.sort,
    variations: req.body.variations,
    created_Date: new Date(),
    created_By: req.body.created_By,
    isDeleted: false,
  };
  const menuItem = await menuItemService.createMenuItem(menuItemList);
  if (menuItem === 400) {
    res.send({ msg: 'Menu Item name already taken!', status: 400, success: 'Failed' });
  } else {
    res.status(httpStatus.CREATED).send({ menuItem, msg: 'Created Successful!', status: 200, success: 'Success' });
  }
});

const updateMenuItem = catchAsync(async (req, res) => {
  const categoriesId = new ObjectId(req.body.categoriesId);
  const menuItemList = {
    categoriesId,
    name: req.body.name,
    description: req.body.description,
    categories: req.body.categories,
    image: req.body.image,
    price: req.body.price,
    number: req.body.number,
    variations: req.body.variations,
    updated_Date: new Date(),
    updated_By: req.body.updated_By,
    isDeleted: false,
  };
  const menuItem = await menuItemService.updateMenuItemById(req.params.menuItemId, menuItemList);
  if (!menuItem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'MenuItem not found');
  }
  if (menuItem === 400) {
    res.send({ msg: 'Menu Item name already taken!', status: 400, success: 'Failed' });
  } else {
    res.send({ menuItem, msg: 'Updated Successful!', status: 200, success: 'Success' });
  }
});

const deleteMenuItem = catchAsync(async (req, res) => {
  const menuItem = await menuItemService.deleteMenuItemById(req.params.menuItemId);
  res.send({ menuItem, msg: 'Deleted Successful!', status: 200 });
});

const getMenuItem = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', '']);
  const options = { limit: req.body.limit, page: req.body.page };
  const result = await menuItemService.queryMenuItem(filter, options);
  res.send({ result, msg: 'Get Successful!', status: 200 });
});

module.exports = {
  menuItemRegister,
  updateMenuItem,
  deleteMenuItem,
  getMenuItem,
};
