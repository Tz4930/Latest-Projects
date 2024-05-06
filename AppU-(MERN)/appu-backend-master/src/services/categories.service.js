const httpStatus = require('http-status');
const { Categories } = require('../models');
const ApiError = require('../utils/ApiError');

const createCategories = async (categoriesBody) => {
  if (await Categories.categoriesTaken(categoriesBody.name)) {
    // throw new ApiError(httpStatus.BAD_REQUEST, 'Categories name is already taken');
    return 400;
  }
  return Categories.create(categoriesBody);
};

const getCategoriesById = async (id) => {
  return Categories.findById(id);
};

/**
 * Update categories by id
 * @param {ObjectId} categoriesId
 * @param {Object} updateBody
 * @returns {Promise<categories>}
 */
const updateCategoriesById = async (categoriesId, updateBody) => {
  const categories = await getCategoriesById(categoriesId);
  if (!categories) {
    throw new ApiError(httpStatus.NOT_FOUND, 'categories not found');
  }
  // if (await Categories.categoriesTaken(updateBody.name)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Categories name is already taken');
  // }
  Object.assign(categories, updateBody);
  await categories.save();
  return categories;
};

/**
 * Delete categories by id
 * @param {ObjectId} categoriesId
 * @returns {Promise<categories>}
 */
const deleteCategoriesById = async (categoriesId) => {
  const categories = await getCategoriesById(categoriesId);
  if (!categories) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Categories not found');
  }
  await Categories.updateOne(
    { _id: categoriesId },
    {
      $set: {
        isDeleted: true,
        deleted_Date: new Date(),
      },
    }
  );
  const categoriesIsDeleted = await getCategoriesById(categoriesId);
  return categoriesIsDeleted;
};

const queryCategories = async (filter, options) => {
  const isDeleted = true;
  const categories = await Categories.paginate(filter, options, isDeleted);
  return categories;
};

module.exports = {
  createCategories,
  updateCategoriesById,
  deleteCategoriesById,
  queryCategories,
};
