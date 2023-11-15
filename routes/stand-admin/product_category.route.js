var express = require("express");
var router = express.Router();

const StandAdminProductCategoryController = require("../../controllers/stand-admin/product_category.controller");

router.get("/", StandAdminProductCategoryController.indexController);
router.post("/", StandAdminProductCategoryController.storeController);
router.get("/:id", StandAdminProductCategoryController.showController);
router.patch("/:id", StandAdminProductCategoryController.updateController);
router.delete("/:id", StandAdminProductCategoryController.deleteController);

module.exports = router;
