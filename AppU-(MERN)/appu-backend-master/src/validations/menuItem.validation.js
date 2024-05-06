const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMenuItem = {
  body: Joi.object().keys({
    categories: Joi.array(),
    categoriesId: Joi.string(),
    description: Joi.string().allow(''),
    name: Joi.string(),
    image: Joi.string(),
    name: Joi.string(),
    sort: Joi.number(),
    price: Joi.string(),
    variations: Joi.array(),
    created_By: Joi.string(),
  }),
};

const getMenuItem = {
  query: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    price: Joi.number(),
    sort: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updateMenuItem = {
  params: Joi.object().keys({
    menuItemId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    categoriesId: Joi.string(),
    name: Joi.string(),
    description: Joi.string().allow(''),
    categories: Joi.array(),
    image: Joi.string(),
    price: Joi.number(),
    sort: Joi.number(),
    variations: Joi.array(),
    updated_By: Joi.string(),
  }),
};

const deleteMenuItem = {
  params: Joi.object().keys({
    menuItemId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createMenuItem,
  updateMenuItem,
  getMenuItem,
  deleteMenuItem,
};
