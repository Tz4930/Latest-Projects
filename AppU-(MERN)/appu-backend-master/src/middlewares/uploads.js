const util = require('util');
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require('dotenv').config();

const maxSize = 10 * 1024 * 1024;
const S3_BUCKET ='appu';
const REGION ='us-east-2';


const s3 = new aws.S3();
console.log(process.env.AWS_ACCESS_KEY);
aws.config.update({
  apiVersion: "2010-12-01",
  region: REGION,
});


const uploadFile = multer({
  storage: multerS3({
    s3,
    bucket: 'appu',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, Date.now().toString()+'-'+file.originalname);
    },
  }),
  limits: { fileSize: maxSize },
});

// const uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFile;
