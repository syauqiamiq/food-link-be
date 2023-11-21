var express = require("express");
var router = express.Router();

const StandAdminProductController = require("../../controllers/stand-admin/product.controller");
const multer = require("multer");
const multerHelper = require("../../utils/multer.util");

router.get("/", StandAdminProductController.indexController);
router.post("/", StandAdminProductController.storeController);
router.get("/:id", StandAdminProductController.showController);
router.patch("/:id", StandAdminProductController.updateController);
router.delete("/:id", StandAdminProductController.deleteController);

router.post(
	"/:id/image",
	multerHelper.single("file"),
	StandAdminProductController.uploadProductImageController
);

module.exports = router;
