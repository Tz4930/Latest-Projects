const express = require('express');
const router = express.Router();
const activityRoute = require('./activity.route');
const signinRoute = require('./signin.route')
const signupRoute = require('./signup.route')
// Middleware function
const myMiddleware = (req, res, next) => {
    next();
  };
  
  // Use the middleware function
  router.use(myMiddleware);
const defaultRoutes = [
    {
      path: '/exercise',
      route: activityRoute,
    },
    {
      path: '/signin',
      route: signinRoute,
    },
    {
      path: '/signup',
      route: signupRoute,
    },
    
];
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });

module.exports = router;  