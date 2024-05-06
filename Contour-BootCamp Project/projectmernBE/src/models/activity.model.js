const mongoose = require("mongoose");
const validator = require('validator');
const activitySchema = mongoose.Schema(
  {
    activitytype: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required:true,
    },
    date: {
      type: String,
      required: true,
      validate: {
        validator: function(value) {
          
          return validator.isAfter(value.toString(), new Date().toISOString());
        },
        message: 'Date must be a future date'
      }
    },
    duration: {
      type: Number,
      required: true,
      min:0,
      max:60
    },
  },
  {
    timestamps: true,
  }
);
const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;