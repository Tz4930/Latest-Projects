const express = require('express');
const validate = require('../../middlewares/validate');
const menuItemCategoriesValidation = require('../../validations/menuItemCategories.validation');
const menuItemCategoriesController = require('../../controllers/menuItemCategories.controller');

const router = express.Router();

router.post(
  '/:businessId/category',
  validate(menuItemCategoriesValidation.createMenuItemCategories),
  menuItemCategoriesController.menuItemCategoriesRegister
);
router.route('/:menuItemCategoriesId/sort').put(menuItemCategoriesController.updateCategorySort);
router
  .route('/:businessId/:menuItemCategoriesId')
  .put(
    validate(menuItemCategoriesValidation.updateMenuItemCategories),
    menuItemCategoriesController.updateMenuItemCategories
  );
router
  .route('/:menuItemCategoriesId')
  .delete(
    validate(menuItemCategoriesValidation.deleteMenuItemCategories),
    menuItemCategoriesController.deleteMenuItemCategories
  );

router.post(
  '/:businessId/list',
  validate(menuItemCategoriesValidation.getMenuItemCategories),
  menuItemCategoriesController.getMenuItemCategories
);

module.exports = router;
