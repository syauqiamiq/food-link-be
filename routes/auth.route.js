var express = require("express");
var router = express.Router();

const AuthController = require("../controllers/auth.controller");

router.post("/login", AuthController.loginController);
router.post("/register", AuthController.registerController);

module.exports = router;
