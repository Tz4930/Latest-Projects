const httpStatus = require('http-status');
const { ObjectId } = require('mongodb');
const { MenuItemCategories, MenuItem } = require('../models');
const ApiError = require('../utils/ApiError');

const createMenuItemCategories = async (categoriesBody) => {
  if (await MenuItemCategories.menuItemCategoriesTaken(categoriesBody.name, categoriesBody.businessId)) {
    // throw new ApiError(httpStatus.BAD_REQUEST, 'Categories name is already taken');
    return 400;
  }
  return MenuItemCategories.create(categoriesBody);
};

const getMenuItemCategoriesById = async (id) => {
  return MenuItemCategories.findById(id);
};

const getMenuItem = async (id) => {
  return MenuItem.find({
    $and: [{ categoriesId: new ObjectId(id) }, { isDeleted: false }],
  });
};

/**
 * Update categories by id
 * @param {ObjectId} menuItemCategoriesId
 * @param {Object} updateBody
 * @returns {Promise<categories>}
 */
const updateSortCategory = async (id, data) => {
  if (data.increment === 'increment') {
    return MenuItemCategories.updateOne({ _id: new ObjectId(id) }, { $set: { sort: data.sort + 1 } });
  }
  if (data.increment === 'decrement') {
    return MenuItemCategories.updateOne({ _id: new ObjectId(id) }, { $set: { sort: data.sort - 1 } });
  }
  if (data.increment === 'menuItemIncrement') {
    return MenuItem.updateOne({ _id: new ObjectId(id) }, { $set: { sort: data.sort + 1 } });
  }
  if (data.increment === 'menuItemDecrement') {
    return MenuItem.updateOne({ _id: new ObjectId(id) }, { $set: { sort: data.sort - 1 } });
  }
};
const updateMenuItemCategoriesById = async (menuItemCategoriesId, updateBody) => {
  const menuItemCategories = await getMenuItemCategoriesById(menuItemCategoriesId);
  if (!menuItemCategories) {
    throw new ApiError(httpStatus.NOT_FOUND, 'categories not found');
  }
  if (await MenuItemCategories.menuItemCategoriesTaken(updateBody.name, updateBody.businessId, menuItemCategoriesId)) {
    // throw new ApiError(httpStatus.BAD_REQUEST, 'Categories name is already taken');
    return 400;
  }
  Object.assign(menuItemCategories, updateBody);
  await menuItemCategories.save();
  return menuItemCategories;
};

/**
 * Delete categories by id
 * @param {ObjectId} menuItemCategoriesId
 * @returns {Promise<categories>}
 */
const deleteMenuItemCategoriesById = async (menuItemCategoriesId) => {
  const menuItemCategories = await getMenuItemCategoriesById(menuItemCategoriesId);
  const menuItem = await getMenuItem(menuItemCategoriesId);
  if (!menuItemCategories) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Categories not found');
  }
  if (menuItem.length > 0) {
    return 400;
    // eslint-disable-next-line no-else-return
  } else if (menuItem.length === 0) {
    await MenuItemCategories.updateOne(
      { _id: menuItemCategoriesId },
      {
        $set: {
          isDeleted: true,
          deleted_Date: new Date(),
        },
      }
    );
    const menuItemCategoriesIsDeleted = await getMenuItemCategoriesById(menuItemCategoriesId);
    return menuItemCategoriesIsDeleted;
  }
};

const queryMenuItemCategories = async (id) => {
  const menuItemCategories = await MenuItemCategories.aggregate([
    { $match: { $or: [{$and: [{ isDeleted: false }, { businessId: id }]}, {$and: [{ isDeleted: false }, { branchesId: id }]}]} },
    {
      $lookup: {
        from: 'menuitems',
        let: { categoriesId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ['$categoriesId', '$$categoriesId'] }, { $eq: ['$isDeleted', false] }],
              },
            },
          },
          {
            $sort: { sort: -1 },
          },
        ],
        as: 'menuitems',
      },
    },
  ]).sort({ sort: -1 });
  return menuItemCategories;
};

module.exports = {
  createMenuItemCategories,
  updateMenuItemCategoriesById,
  deleteMenuItemCategoriesById,
  queryMenuItemCategories,
  updateSortCategory,
};
