const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const businessSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    urlKey:{
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    startTime: {
      type: String,
      trim: true,
    },
    endTime: {
      type: String,
      trim: true,
    },
    categories: {
      type: Array,
      // required: true,
    },
    description: {
      type: String,
      required: true,
    },
    appuDiscount : {
      type: Number,
      default: 0
    },
    whatsAppNumber: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    location: {
      type: Object,
    },
    deliveryOrPickup: {
      type: Object,
    },
    deliveryAreas: {
      type: Array,
      required: true,
    },
    freeDeliveryCharges: {
      type: Object,
    },
    deliveryCharges: {
      type: Object,
    },
    userId: '',
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

businessSchema.plugin(toJSON);
businessSchema.plugin(paginate);

businessSchema.statics.restaurantTaken = async function (name) {
  // eslint-disable-next-line security/detect-non-literal-regexp
  const business = await this.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') }, isDeleted: false });
  return !!business;
};

const BusinessRegister = mongoose.model('business', businessSchema);

module.exports = BusinessRegister;
