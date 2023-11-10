var express = require("express");
var router = express.Router();

const AdminAppAuthController = require("../../controllers/app-admin/auth.controller");

router.post("/login", AdminAppAuthController.appAdminLoginController);

module.exports = router;
