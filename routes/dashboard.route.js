var express = require("express");
var router = express.Router();

const DashboardController = require("../controllers/dashboard.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.use(authMiddleware);
router.get(
	"/canteen/:id/stand",
	DashboardController.listStandByCanteenController
);
router.get(
	"/stand/:id/product",
	DashboardController.listProductByStandController
);
router.get("/my-transaction", DashboardController.listMyTranscation);

module.exports = router;
