var express = require("express");
var router = express.Router();

const CompanyAdminUserController = require("../../controllers/company-admin/user.controller");

router.get("/", CompanyAdminUserController.indexController);
router.post("/", CompanyAdminUserController.storeController);
router.get("/:id", CompanyAdminUserController.showController);
router.patch("/:id", CompanyAdminUserController.updateController);
router.delete("/:id", CompanyAdminUserController.deleteController);

module.exports = router;
