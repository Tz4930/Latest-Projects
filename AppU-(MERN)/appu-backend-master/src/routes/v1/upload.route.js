const fileController = require('../../controllers/file.controller');

module.exports = (app) => {
  app.post('/business/image/uploads', fileController.upload);
};
