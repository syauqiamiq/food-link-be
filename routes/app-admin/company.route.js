var express = require("express");
var router = express.Router();

const AdminAppCompanyController = require("../../controllers/app-admin/company.controller");

router.get("/", AdminAppCompanyController.indexController);
router.post("/", AdminAppCompanyController.storeController);
router.get("/:id", AdminAppCompanyController.showController);
router.patch("/:id", AdminAppCompanyController.updateController);
router.delete("/:id", AdminAppCompanyController.deleteController);
router.get("/:id/user", AdminAppCompanyController.listCompanyUserController);

module.exports = router;
