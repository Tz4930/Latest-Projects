const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBusiness = {
  params: Joi.object().keys({
    userId: Joi.string(),
  }),
  body: Joi.object().keys({
    firstName: Joi.string().allow(''),
    lastName: Joi.string().allow(''),
    name: Joi.string(),
    address: Joi.string(),
    urlKey: Joi.string(),
    startTime: Joi.string(),
    endTime: Joi.string(),
    appuDiscount: Joi.number(),
    categories: Joi.array(),
    description: Joi.string(),
    whatsAppNumber: Joi.string(),
    image: Joi.string(),
    location: Joi.object(),
    deliveryOrPickup: Joi.object(),
    deliveryAreas: Joi.array(),
    freeDeliveryCharges: Joi.object(),
    deliveryCharges: Joi.object(),
    created_By: Joi.string(),
  }),
};

const getBusiness = {
  query: Joi.object().keys({
    firstName: Joi.string().allow(''),
    lastName: Joi.string().allow(''),
    name: Joi.string(),
    address: Joi.string(),
    startTime: Joi.string(),
    urlKey: Joi.string(),
    endTime: Joi.string(),
    appuDiscount: Joi.number(),
    categories: Joi.array(),
    description: Joi.string(),
    whatsAppNumber: Joi.string(),
    image: Joi.string(),
    location: Joi.object(),
    deliveryOrPickup: Joi.object(),
    deliveryAreas: Joi.array(),
    freeDeliveryCharges: Joi.object(),
    deliveryCharges: Joi.object(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updateBusiness = {
  params: Joi.object().keys({
    businessId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    address: Joi.string(),
    // categories: Joi.array(),
    description: Joi.string(),
    whatsAppNumber: Joi.string(),
    image: Joi.string(),
    // location: Joi.object(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    deliveryOrPickup: Joi.object(),
    deliveryAreas: Joi.array(),
    freeDeliveryCharges: Joi.object(),
    deliveryCharges: Joi.object(),
    updated_By: Joi.string(),
  }),
};

const deleteBusiness = {
  params: Joi.object().keys({
    businessId: Joi.string().custom(objectId),
  }),
};

const getBusinessById = {
  params: Joi.object().keys({
    businessId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createBusiness,
  getBusiness,
  updateBusiness,
  deleteBusiness,
  getBusinessById,
};
