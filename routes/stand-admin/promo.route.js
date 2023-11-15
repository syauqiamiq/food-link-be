var express = require("express");
var router = express.Router();

const StandAdminPromoController = require("../../controllers/stand-admin/promo.controller");

router.get("/", StandAdminPromoController.indexController);
router.post("/", StandAdminPromoController.storeController);
router.get("/:id", StandAdminPromoController.showController);
router.patch("/:id", StandAdminPromoController.updateController);
router.delete("/:id", StandAdminPromoController.deleteController);

module.exports = router;
