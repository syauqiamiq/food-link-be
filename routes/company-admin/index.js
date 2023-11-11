var express = require("express");
var router = express.Router();

const companyAdminCanteenRoutes = require("./canteen.route");
const companyAdminStandRoutes = require("./stand.route");
const companyAdminUserRoutes = require("./user.route");

const authMiddleware = require("../../middleware/auth.middleware");

router.use(authMiddleware);
router.use("/canteen", companyAdminCanteenRoutes);
router.use("/stand", companyAdminStandRoutes);
router.use("/user", companyAdminUserRoutes);

module.exports = router;
