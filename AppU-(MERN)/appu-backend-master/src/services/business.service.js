const httpStatus = require('http-status');
const { BusinessRegister } = require('../models');
const ApiError = require('../utils/ApiError');
const {MenuItemCategories} =require('../models')
const { ObjectId } = require('mongodb');

const createBusiness = async (businessBody) => {
  const nameAllReadyTaken = await BusinessRegister.restaurantTaken(businessBody.name);
  console.log('nameAllReadyTaken============', nameAllReadyTaken);
  if (await BusinessRegister.restaurantTaken(businessBody.name)) {
    //  throw new ApiError(httpStatus.BAD_REQUEST, 'Business name is already taken');
    return 400;
  }
  return BusinessRegister.create(businessBody);
};

const getBusinessById = async (id) => {
  return BusinessRegister.findById(id);
};

const getBusinessByUrlKey = async (urlKey) => {
  return BusinessRegister.findOne({ urlKey: urlKey });
};

const getBusinessByUserId = async (id) => {
  const business = await BusinessRegister.findOne({ userId: id });
  return business;
};

const checkUrl = async (urlKey) => {
  const business = await BusinessRegister.findOne({ urlKey: urlKey.toLowerCase() });
  return business;
};

/**
 * Update user by id
 * @param {ObjectId} businessId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateBusinessById = async (businessId, updateBody) => {
  const business = await getBusinessById(businessId);
  if (!business) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Business not found');
  }
  if (await BusinessRegister.restaurantTaken(updateBody._id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Business name is already taken');
  }
  Object.assign(business, updateBody);
  await business.save();
  return business;
};

/**
 * Delete user by id
 * @param {ObjectId} businessId
 * @returns {Promise<User>}
 */
const deleteBusinessById = async (businessId) => {
  const business = await getBusinessById(businessId);
  if (!business) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Business not found');
  }
  await BusinessRegister.updateOne(
    { _id: businessId },
    {
      $set: {
        isDeleted: true,
        deleted_Date: new Date(),
      },
    }
  );
  const businessIsDeleted = await getBusinessById(businessId);
  return businessIsDeleted;
};

const queryBusiness = async (filter, options) => {
  const isDeleted = true;
  const business = await BusinessRegister.paginate(filter, options, isDeleted);
  return business;
};

const restSearch = async (item)=>{
  const business = await BusinessRegister.find(
    { 
     "$or":[
       {name:{$regex:item}}
     ]
   }
    
    );
return business;
}
const copyBusinessMenu =async(IDfrom,ToID)=>{

  const business = await MenuItemCategories.find({businessId:new ObjectId(IDfrom)})
  const businessnew = await MenuItemCategories.updateMany(
    {businessId:new ObjectId(IDfrom)},
    {$push :{branchesId:new ObjectId(ToID)}}
    )
  return business;
  
}

module.exports = {
  createBusiness,
  updateBusinessById,
  deleteBusinessById,
  getBusinessById,
  queryBusiness,
  getBusinessByUserId,
  getBusinessByUrlKey,
  checkUrl,
  restSearch,
  copyBusinessMenu
};
