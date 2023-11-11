var express = require("express");
var router = express.Router();

const CompanyAdminStandController = require("../../controllers/company-admin/stand.controller");

router.get("/", CompanyAdminStandController.indexController);
router.post("/", CompanyAdminStandController.storeController);
router.get("/:id", CompanyAdminStandController.showController);
router.patch("/:id", CompanyAdminStandController.updateController);
router.delete("/:id", CompanyAdminStandController.deleteController);
router.post(
	"/:id/assign-admin",
	CompanyAdminStandController.assignStandAdminController
);

module.exports = router;
