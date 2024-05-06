const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const businessValidation = require('../../validations/business.validation');
const businessController = require('../../controllers/business.controller');

const router = express.Router();

router.get('/url-availability/:urlKey', businessController.checkUrl);
router.get('/business-list', validate(businessValidation.getBusiness), businessController.getBusiness);
router.post('/:userId', validate(businessValidation.createBusiness), businessController.businessRegister);
router.get('/:userId/business', businessController.getBusinessUserId);
router.get('/business-by-key/:urlKey', businessController.getBusinessByUrlKey);
router.get('/search/:key', businessController.searchBusiness);
router.get('/copy-business-menu/:from/:to',businessController.copyBusinessMenu)
router
  .route('/:businessId')
  .delete(validate(businessValidation.deleteBusiness), businessController.deleteBusiness)
  .put(validate(businessValidation.updateBusiness), businessController.updateBusiness)
  .get(validate(businessValidation.getBusinessById), businessController.getBusinessById);

module.exports = router;

// .put(auth('updateBusiness'), validate(businessValidation.updateBusiness), businessController.updateBusiness)