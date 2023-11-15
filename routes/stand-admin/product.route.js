var express = require("express");
var router = express.Router();

const StandAdminProductController = require("../../controllers/stand-admin/product.controller");

router.get("/", StandAdminProductController.indexController);
router.post("/", StandAdminProductController.storeController);
router.get("/:id", StandAdminProductController.showController);
router.patch("/:id", StandAdminProductController.updateController);
router.delete("/:id", StandAdminProductController.deleteController);

module.exports = router;
