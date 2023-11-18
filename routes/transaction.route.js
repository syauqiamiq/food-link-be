var express = require("express");
var router = express.Router();

const TransactionController = require("../controllers/transaction.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post(
	"/midtrans/callback",
	TransactionController.midtransCallbackController
);

router.use(authMiddleware);
router.post("/create", TransactionController.createTransaction);

module.exports = router;
