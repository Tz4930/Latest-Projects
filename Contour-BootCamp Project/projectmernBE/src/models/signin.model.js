const mongoose = require("mongoose");

const signinSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Signin = mongoose.model('Signin', signinSchema);

module.exports = Signin;
