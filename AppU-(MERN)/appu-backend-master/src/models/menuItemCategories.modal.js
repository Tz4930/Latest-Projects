const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const menuItemCategoriesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    sort: {
      type: Number,
    },
    businessId: '',
    isDeleted: false,
    branchesId: [],
    created_Date: '',
    deleted_Date: '',
    updated_Date: '',
    created_By: {
      type: String,
    },
    Updated_By: {
      type: String,
    },
    Deleted_By: '',
  },
  {
    timestamps: true,
  }
);

menuItemCategoriesSchema.plugin(toJSON);
menuItemCategoriesSchema.plugin(paginate);

menuItemCategoriesSchema.statics.menuItemCategoriesTaken = async function (name, userBusinessId, excludeUserId) {
  if (excludeUserId) {
    const menuItemCategories = await this.findOne({
      // eslint-disable-next-line security/detect-non-literal-regexp
      name: { $regex: new RegExp(`^${name}$`, 'i') },
      _id: { $ne: excludeUserId },
      businessId: userBusinessId,
      isDeleted: false,
    });
    return !!menuItemCategories;
  }
  const menuItemCategories = await this.findOne({
    // eslint-disable-next-line security/detect-non-literal-regexp
    name: { $regex: new RegExp(`^${name}$`, 'i') },
    businessId: userBusinessId,
    isDeleted: false,
  });
  return !!menuItemCategories;
};

const MenuItemCategories = mongoose.model('menuItemCategories', menuItemCategoriesSchema);

module.exports = MenuItemCategories;
