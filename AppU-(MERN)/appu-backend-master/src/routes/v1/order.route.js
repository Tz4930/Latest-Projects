const express = require('express');

const ordersController = require('../../controllers/orders.controller');

const router = express.Router();

router.post('/order', ordersController.saveOrder);

// router
//   .route('/:categoriesId')
//   .put(validate(categoriesValidation.updateCategories), categoriesController.updateCategories)
//   .delete(validate(categoriesValidation.deleteCategoies), categoriesController.deleteCategories);

// router
//   // .route('/list')
//   .post('/list', validate(categoriesValidation.getCategories), categoriesController.getCategories);

module.exports = router;
