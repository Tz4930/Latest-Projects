const httpStatus = require("http-status");
const { signinService, signupService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const saveSignin = catchAsync(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Retrieve the user from the database based on the email
    const user = await signupService.getUserByEmail(email);

    if (user) {
      // Compare the entered password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Passwords match, generate a JWT token with expiry
        const expiresIn = '1h'; // Token expires in 1 hour
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn });

        await signinService.createSignin({ email, password });

        res.status(httpStatus.OK).send({
          user,
          token,
          expiresIn,
          msg: "Sign-in Successful!",
          status: httpStatus.OK,
          success: true,
        });
      } else {
        // Passwords do not match
        res.status(httpStatus.UNAUTHORIZED).send({
          msg: "Invalid email or password",
          status: httpStatus.UNAUTHORIZED,
          success: false,
        });
      }
    } else {
      // User not found
      res.status(httpStatus.UNAUTHORIZED).send({
        msg: "Invalid email or password",
        status: httpStatus.UNAUTHORIZED,
        success: false,
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = {
  saveSignin,
};
