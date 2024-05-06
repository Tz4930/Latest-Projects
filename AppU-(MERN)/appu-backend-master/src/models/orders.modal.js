const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const ordersSchema = mongoose.Schema(
  {
    businessId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'BusinessRegister',
      required: true,
    },
    urlKey: {
      type: String,
    },
    orderItems: {
      type: Array,
    },
    totalPrice: {
      type: Number
    },
    discount: {
      type: Number
    }
  },
  {
    timestamps: true,
  }
);

ordersSchema.plugin(toJSON);

const Orders = mongoose.model('orders', ordersSchema);

module.exports = Orders;
