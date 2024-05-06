const express = require('express');
const validate = require('../../middlewares/validate');
// const auth = require('../../middlewares/auth');
const categoriesValidation = require('../../validations/categories.validation');
const categoriesController = require('../../controllers/categories.controller');

const router = express.Router();

router.post('/category', validate(categoriesValidation.createCategories), categoriesController.categoriesRegister);

router
  .route('/:categoriesId')
  .put(validate(categoriesValidation.updateCategories), categoriesController.updateCategories)
  .delete(validate(categoriesValidation.deleteCategoies), categoriesController.deleteCategories);

router
  // .route('/list')
  .post('/list', validate(categoriesValidation.getCategories), categoriesController.getCategories);

module.exports = router;
