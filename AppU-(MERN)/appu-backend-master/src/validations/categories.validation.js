const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCategories = {
  body: Joi.object().keys({
    name: Joi.string(),
    image: Joi.string(),
    description: Joi.string(),
    isActive: Joi.boolean(),
    created_By: Joi.string(),
  }),
};

const updateCategories = {
  params: Joi.object().keys({
    categoriesId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    image: Joi.string(),
    description: Joi.string(),
    isActive: Joi.boolean(),
    updated_By: Joi.string(),
  }),
};

const getCategories = {
  query: Joi.object().keys({
    name: Joi.string(),
    image: Joi.string(),
    description: Joi.string(),
    isActive: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const deleteCategories = {
  params: Joi.object().keys({
    categoriesId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCategories,
  updateCategories,
  getCategories,
  deleteCategories,
};
