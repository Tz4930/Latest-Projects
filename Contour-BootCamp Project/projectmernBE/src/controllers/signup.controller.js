const httpStatus = require("http-status");
const { signupService } = require("../services");
const bcrypt = require("bcryptjs");

const saveSignup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await signupService.getUserByEmail(email);

    if (existingUser) {
      // User already exists, send an appropriate response
      return res.status(httpStatus.CONFLICT).send({
        msg: "User already exists",
        status: httpStatus.CONFLICT,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);


    const result = await signupService.createSignup({ username, email, password: hashedPassword });
    res.status(httpStatus.CREATED).send({
      result,
      msg: "SignUp Created Successful!",
      status: httpStatus.CREATED,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  saveSignup,
};
