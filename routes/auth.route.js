var express = require("express");
var router = express.Router();

const AuthController = require("../controllers/auth.controller");

router.post("/login", AuthController.loginController);
router.post("/token/check", AuthController.checkAuthOtpTokenController);
router.post("/authorize", AuthController.authorizeUserController);
router.post("/register", AuthController.registerController);

module.exports = router;
