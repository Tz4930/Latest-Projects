const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const mongoose = require('mongoose');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const {scheduleOrderEmails} = require ('./services/orderEmail.services')

const app = express();

global.__basedir = __dirname;

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

app.use('/api/public/images/uploads', express.static('public/images/uploads'));
const initRoutes = require('./routes/v1/upload.route');

initRoutes(app);
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
mongoose.Promise = global.Promise;

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
  // app.use('/v1/restaurant', authLimiter);
}

// v1 api routes
app.use('/api/v1', routes);

app.use((req, res, next) => {
  res.header(`Access-Control-Allow-Headers`, `x-access-token, Origin, Content-Type, Accept`);
  next();
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);
scheduleOrderEmails();

module.exports = app;
