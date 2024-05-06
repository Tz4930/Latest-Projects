const httpStatus = require('http-status');
const { ObjectId } = require('mongodb');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { businessService } = require('../services');

const businessRegister = catchAsync(async (req, res) => {
  const userId = new ObjectId(req.params.userId);
  const businessList = {
    userId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    name: req.body.name,
    address: req.body.address,
    startTime: req.body.startTime,
    urlKey: req.body.urlKey,
    endTime: req.body.endTime,
    appuDiscount: req.body.appuDiscount,
    categories: req.body.categories,
    description: req.body.description,
    whatsAppNumber: req.body.whatsAppNumber,
    location: req.body.location,
    deliveryOrPickup: req.body.deliveryOrPickup,
    image: req.body.image,
    freeDeliveryCharges: req.body.freeDeliveryCharges,
    deliveryCharges: req.body.deliveryCharges,
    created_Date: new Date(),
    created_By: req.body.created_By,
    isDeleted: false,
  };
  const business = await businessService.createBusiness(businessList);
  if (business === 400) {
    res.send({ msg: 'Business name already taken!', status: 400, success: 'Failed' });
  } else {
    res.status(httpStatus.CREATED).send({ business, msg: 'Created Successful!', status: 200, success: 'Success' });
  }
});

const updateBusiness = catchAsync(async (req, res) => {
  const businessList = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    name: req.body.name,
    address: req.body.address,
    categories: req.body.categories,
    description: req.body.description,
    whatsAppNumber: req.body.whatsAppNumber,
    location: req.body.location,
    deliveryOrPickup: req.body.deliveryOrPickup,
    image: req.body.image,
    delivery: req.body.delivery,
    freeDeliveryCharges: req.body.freeDeliveryCharges,
    deliveryCharges: req.body.deliveryCharges,
    updated_Date: new Date(),
    updated_By: req.body.updated_By,
    isDeleted: false,
  };
  const business = await businessService.updateBusinessById(req.params.businessId, businessList);
  if (!business) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Business not found');
  }
  if (business === 400) {
    res.send({ msg: 'Business name already taken!', status: 400, success: 'Failed' });
  } else {
    res.send({ business, msg: 'Updated Successful!', status: 200 });
  }
});

const deleteBusiness = catchAsync(async (req, res) => {
  const business = await businessService.deleteBusinessById(req.params.businessId);
  res.send({ business, msg: 'Deleted Successful!', status: 200 });
});

const getBusinessById = catchAsync(async (req, res) => {
  const business = await businessService.getBusinessById(req.params.businessId);
  res.send({ business, msg: 'Get Successful!', status: 200 });
});
const getBusinessByUrlKey = catchAsync(async (req, res) => {
  console.log("HREEERERER")
  const business = await businessService.getBusinessByUrlKey(req.params.urlKey);
  res.send({ business, msg: 'Get Successful!', status: 200 });
});
const checkUrl = catchAsync(async (req, res) => {
  const business = await businessService.checkUrl(req.params.urlKey);
  res.send({ business, msg: 'Get Successful!', status: 200 });
});
const getBusinessUserId = catchAsync(async (req, res) => {
  const userId = new ObjectId(req.params.userId);
  const business = await businessService.getBusinessByUserId(userId);
  res.send({ business, msg: 'Get Successful!', status: 200 });
});
const getBusiness = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', '']);
  const options = { limit: req.query.limit, page: req.query.page };
  const result = await businessService.queryBusiness(filter, options);
  res.send({ result, msg: 'Get Successful!', status: 200 });
});

const searchBusiness = catchAsync (async(req,res)=>{
  const selectBusiness = new RegExp(req.params.key, 'i')
  const searchResult = await businessService.restSearch(selectBusiness);
  res.send({ searchResult, msg: 'Search Successful!', status: 200 });

})
const updtBusiness = catchAsync(async(req,res)=>{
  res.send({status:"updated"})
})
const copyBusinessMenu = catchAsync(async(req,res)=>{
  const fromID = (  req.params.from);
  const ToID =(req.params.to );
  const businessIDS = await businessService.copyBusinessMenu(fromID,ToID);
  res.send({ businessIDS, msg: 'Search Successful!', status: 200 });
})


module.exports = {
  businessRegister,
  updateBusiness,
  deleteBusiness,
  getBusinessById,
  getBusiness,
  getBusinessUserId,
  getBusinessByUrlKey,
  checkUrl,
  searchBusiness,
  updtBusiness,
  copyBusinessMenu,
};
