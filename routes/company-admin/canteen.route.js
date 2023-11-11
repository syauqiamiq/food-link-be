var express = require("express");
var router = express.Router();

const CompanyAdminCanteenController = require("../../controllers/company-admin/canteen.controller");

router.get("/", CompanyAdminCanteenController.indexController);
router.post("/", CompanyAdminCanteenController.storeController);
router.get("/:id", CompanyAdminCanteenController.showController);
router.patch("/:id", CompanyAdminCanteenController.updateController);
router.delete("/:id", CompanyAdminCanteenController.deleteController);

module.exports = router;
