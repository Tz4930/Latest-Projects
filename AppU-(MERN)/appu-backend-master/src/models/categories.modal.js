const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const categoriesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      require: true,
    },
    isActive: {
      type: Boolean,
      require: true,
    },
    isDeleted: false,
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

categoriesSchema.plugin(toJSON);
categoriesSchema.plugin(paginate);

categoriesSchema.statics.categoriesTaken = async function (name) {
  // eslint-disable-next-line security/detect-non-literal-regexp
  const category = await this.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') }, isDeleted: false });
  return !!category;
};

const Categories = mongoose.model('categories', categoriesSchema);

module.exports = Categories;
