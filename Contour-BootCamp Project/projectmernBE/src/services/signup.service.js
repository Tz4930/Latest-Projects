const { Signup } = require("../models");

const createSignup = async (signupBody) => {
  return Signup.create(signupBody);
};

const getUserByEmail = async (email) => {
  return Signup.findOne({ email });
};

module.exports = {
  createSignup,
  getUserByEmail,
};
