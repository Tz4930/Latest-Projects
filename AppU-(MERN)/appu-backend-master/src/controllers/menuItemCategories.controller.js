const httpStatus = require('http-status');
const { ObjectId } = require('mongodb');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { menuItemCategoriesService } = require('../services');

const menuItemCategoriesRegister = catchAsync(async (req, res) => {
  const id = req.params.businessId;
  const businessId = new ObjectId(id);
  const categoriesList = {
    businessId,
    name: req.body.name,
    description: req.body.description,
    sort: req.body.sort,
    image: req.body.image,
    isActive: req.body.isActive,
    created_Date: new Date(),
    created_By: req.body.created_By,
    isDeleted: false,
  };
  const categories = await menuItemCategoriesService.createMenuItemCategories(categoriesList);
  if (categories === 400) {
    res.send({ msg: 'Categories name already taken!', status: 400, success: 'Failed' });
  } else {
    res.status(httpStatus.CREATED).send({ categories, msg: 'Created Successful!', status: 200, success: 'Success' });
  }
});

const updateMenuItemCategories = catchAsync(async (req, res) => {
  const businessId = new ObjectId(req.params.businessId);
  const categoriesList = {
    businessId,
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    sort: req.body.sort,
    isActive: req.body.isActive,
    updated_Date: new Date(),
    updated_By: req.body.updated_By,
    isDeleted: false,
  };
  const categories = await menuItemCategoriesService.updateMenuItemCategoriesById(
    req.params.menuItemCategoriesId,
    categoriesList
  );
  if (!categories) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Resturant not found');
  }
  if (categories === 400) {
    res.send({ msg: 'Categories name already taken!', status: 400, success: 'Failed' });
  } else {
    res.send({ categories, msg: 'Updated Successful!', status: 200, success: 'Success' });
  }
});

const deleteMenuItemCategories = catchAsync(async (req, res) => {
  const categories = await menuItemCategoriesService.deleteMenuItemCategoriesById(req.params.menuItemCategoriesId);
  if (categories === 400) {
    res.send({ msg: 'Menu item exist against this category!', status: 400, success: 'Failed' });
  } else {
    res.send({ categories, msg: 'Deleted Successful!', status: 200, success: 'Success' });
  }
});

const getMenuItemCategories = catchAsync(async (req, res) => {
  // const filter = pick(req.query, ['name', '']);
  // const options = { limit: req.body.limit, page: req.body.page };
  const businessId = new ObjectId(req.params.businessId);
  const result = await menuItemCategoriesService.queryMenuItemCategories(businessId);
  res.send({ result, msg: 'Get Successful!', status: 200 });
});

const updateCategorySort = catchAsync(async (req, res) => {
  const menuItemCategoriesId = new ObjectId(req.params.menuItemCategoriesId);
  const result = await menuItemCategoriesService.updateSortCategory(menuItemCategoriesId, req.body);
  res.send({ result, msg: 'Sort Successful!', status: 200 });
});

module.exports = {
  menuItemCategoriesRegister,
  updateMenuItemCategories,
  deleteMenuItemCategories,
  getMenuItemCategories,
  updateCategorySort,
};
