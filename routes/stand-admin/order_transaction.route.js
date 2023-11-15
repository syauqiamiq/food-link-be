var express = require("express");
var router = express.Router();

const StandAdminOrderTransactionController = require("../../controllers/stand-admin/order_transaction.controller");

router.get("/", StandAdminOrderTransactionController.indexController);

module.exports = router;
