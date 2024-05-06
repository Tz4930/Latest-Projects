const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { categoriesService } = require('../services');

const categoriesRegister = catchAsync(async (req, res) => {
  const categoriesList = {
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    isActive: req.body.isActive,
    created_Date: new Date(),
    created_By: req.body.created_By,
    isDeleted: false,
  };
  const categories = await categoriesService.createCategories(categoriesList);
  if (categories === 400) {
    res.send({ msg: 'Category name already taken!', status: 400, success: 'Failed' });
  } else {
    res.status(httpStatus.CREATED).send({ categories, msg: 'Created Successful!', status: 200, success: 'Success' });
  }
});

const updateCategories = catchAsync(async (req, res) => {
  const categoriesList = {
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    isActive: req.body.isActive,
    updated_Date: new Date(),
    updated_By: req.body.updated_By,
    isDeleted: false,
  };
  const categories = await categoriesService.updateCategoriesById(req.params.categoriesId, categoriesList);
  if (!categories) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Resturant not found');
  }
  res.send({ categories, msg: 'Updated Successful!', status: 200, success: 'Success' });
});

const deleteCategories = catchAsync(async (req, res) => {
  const categories = await categoriesService.deleteCategoriesById(req.params.categoriesId);
  res.send({ categories, msg: 'Deleted Successful!', status: 200 });
});

const getCategories = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', '']);
  const options = { limit: req.body.limit, page: req.body.page };
  const result = await categoriesService.queryCategories(filter, options);
  res.send({ result, msg: 'Get Successful!', status: 200 });
});

module.exports = {
  categoriesRegister,
  updateCategories,
  deleteCategories,
  getCategories,
};
