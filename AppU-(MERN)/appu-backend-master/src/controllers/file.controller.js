const uploadFile = require('../middlewares/uploads');
const singleUpload = uploadFile.single("file");

const upload = async (req, res) => {
  singleUpload(req, res, function (err) {
    if (err) {
      return res.json({
        success: false,
        errors: {
          title: "Image Upload Error",
          detail: err.message,
          error: err,
        },
      });
    } else {
      res.status(200).send({
            message: 'Uploaded the file successfully: ',
            data: req.file.location,
            status: 200,
            success: 'Success',
      });
    }
  });
  // try {
  //   await uploadFile(req, res);
  //   if (req.file === undefined) {
  //     return res.status(400).send({ message: 'Please upload a file!' });
  //   }
  //   console.log(res);
  //   res.status(200).send({
  //     message: 'Uploaded the file successfully: ',
  //     data: req.file.originalname,
  //     status: 200,
  //     success: 'Success',
  //   });
  // } catch (err) {
  //   res.status(500).send({
  //     message: `Could not upload the file: ${req.file.originalname}. ${err}`,
  //     status: 5000,
  //   });
  // }
};

module.exports = { upload };
