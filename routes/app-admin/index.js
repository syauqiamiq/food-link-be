var express = require("express");
var router = express.Router();

const appAdminAuthRoutes = require("./auth.route");
const appAdminCompanyRoutes = require("./company.route");

router.use("/auth", appAdminAuthRoutes);
router.use("/company", appAdminCompanyRoutes);

module.exports = router;
