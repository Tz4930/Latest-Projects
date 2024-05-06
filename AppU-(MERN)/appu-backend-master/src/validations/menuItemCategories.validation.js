const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMenuItemCategories = {
  params: Joi.object().keys({
    businessId: Joi.string(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    image: Joi.string(),
    description: Joi.string(),
    sort: Joi.number(),
    isActive: Joi.boolean(),
    created_By: Joi.string(),
  }),
};

const updateMenuItemCategories = {
  params: Joi.object().keys({
    menuItemCategoriesId: Joi.required().custom(objectId),
    businessId: Joi.string(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    image: Joi.string(),
    description: Joi.string(),
    sort: Joi.number(),
    isActive: Joi.boolean(),
    updated_By: Joi.string(),
  }),
};

const getMenuItemCategories = {
  params: Joi.object().keys({
    businessId: Joi.string(),
  }),
  query: Joi.object().keys({
    name: Joi.string(),
    image: Joi.string(),
    description: Joi.string(),
    sort: Joi.number(),
    isActive: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const deleteMenuItemCategories = {
  params: Joi.object().keys({
    menuItemCategoriesId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createMenuItemCategories,
  updateMenuItemCategories,
  getMenuItemCategories,
  deleteMenuItemCategories,
};
