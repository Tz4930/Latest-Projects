const express = require('express');
const validate = require('../../middlewares/validate');
// const auth = require('../../middlewares/auth');
const menuItemValidation = require('../../validations/menuItem.validation');
const menuItemController = require('../../controllers/menuItem.controller');

const router = express.Router();

router.post('/menu', validate(menuItemValidation.createMenuItem), menuItemController.menuItemRegister);
router.post('/menuItems-list', validate(menuItemValidation.getMenuItem), menuItemController.getMenuItem);
router
  .route('/:menuItemId')
  .delete(validate(menuItemValidation.deleteMenuItem), menuItemController.deleteMenuItem)
  .put(validate(menuItemValidation.updateMenuItem), menuItemController.updateMenuItem);

module.exports = router;
