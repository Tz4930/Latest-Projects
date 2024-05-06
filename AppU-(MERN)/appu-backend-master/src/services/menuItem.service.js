const httpStatus = require('http-status');
const { MenuItem } = require('../models');
const ApiError = require('../utils/ApiError');

const createMenuItem = async (menuItemBody) => {
  if (await MenuItem.menuItemTaken(menuItemBody.name, menuItemBody.categoriesId)) {
    // throw new ApiError(httpStatus.BAD_REQUEST, 'MenuItem name is already taken');
    return 400;
  }
  return MenuItem.create(menuItemBody);
};

const getMenuItemById = async (id) => {
  return MenuItem.findById(id);
};

/**
 * Update menuItem by id
 * @param {ObjectId} menuItemId
 * @param {Object} updateBody
 * @returns {Promise<menuItem>}
 */
const updateMenuItemById = async (menuItemId, updateBody) => {
  const menuItem = await getMenuItemById(menuItemId);
  if (!menuItem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'MenuItem not found');
  }
  if (await MenuItem.menuItemTaken(updateBody.name, updateBody.categoriesId, menuItemId)) {
    return 400;
  }
  Object.assign(menuItem, updateBody);
  await menuItem.save();
  return menuItem;
};

/**
 * Delete menuItem by id
 * @param {ObjectId} menuItemId
 * @returns {Promise<menuItem>}
 */
const deleteMenuItemById = async (menuItemId) => {
  const menuItem = await getMenuItemById(menuItemId);
  if (!menuItem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'MenuItem not found');
  }
  await MenuItem.updateOne(
    { _id: menuItemId },
    {
      $set: {
        isDeleted: true,
        deleted_Date: new Date(),
      },
    }
  );
  const menuItemIsDeleted = await getMenuItemById(menuItemId);
  return menuItemIsDeleted;
};

const queryMenuItem = async (filter, options) => {
  const isDeleted = true;
  const menuItem = await MenuItem.paginate(filter, options, isDeleted);
  return menuItem;
};

module.exports = {
  createMenuItem,
  updateMenuItemById,
  deleteMenuItemById,
  queryMenuItem,
};
