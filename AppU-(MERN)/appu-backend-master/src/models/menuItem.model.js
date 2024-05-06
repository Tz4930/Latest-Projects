const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const menuItemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    categories: {
      type: Array,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    sort: {
      type: Number,
      required: true,
    },
    variations: {
      type: Array,
      default: []
    },
    isDeleted: false,
    created_Date: '',
    deleted_Date: '',
    updated_Date: '',
    categoriesId: '',
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

menuItemSchema.plugin(toJSON);
menuItemSchema.plugin(paginate);

menuItemSchema.statics.menuItemTaken = async function (name, categoryId, excludeUserId) {
  if (excludeUserId) {
    const menuItem = await this.findOne({
      // eslint-disable-next-line security/detect-non-literal-regexp
      name: { $regex: new RegExp(`^${name}$`, 'i') },
      _id: { $ne: excludeUserId },
      categoriesId: categoryId,
      isDeleted: false,
    });
    return !!menuItem;
  }
  const menuItem = await this.findOne({
    // eslint-disable-next-line security/detect-non-literal-regexp
    name: { $regex: new RegExp(`^${name}$`, 'i') },
    categoriesId: categoryId,
    isDeleted: false,
  });
  return !!menuItem;
};

const MenuItem = mongoose.model('menuItems', menuItemSchema);

module.exports = MenuItem;
