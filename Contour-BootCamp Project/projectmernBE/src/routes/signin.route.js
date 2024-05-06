const express = require("express");
const router = express.Router();
const signinController = require("../controllers/signin.controller");
router.post("/", signinController.saveSignin);

module.exports = router;
