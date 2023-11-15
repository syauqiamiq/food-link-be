var express = require("express");
var router = express.Router();

const standAdminProductCategoryRoutes = require("./product_category.route");
const standAdminPromoRoutes = require("./promo.route");
const standAdminProductRoutes = require("./product.route");
const standAdminOrderTransactionRoutes = require("./order_transaction.route");

const authMiddleware = require("../../middleware/auth.middleware");

router.use(authMiddleware);
router.use("/product-category", standAdminProductCategoryRoutes);
router.use("/promo", standAdminPromoRoutes);
router.use("/product", standAdminProductRoutes);
router.use("/order-transaction", standAdminOrderTransactionRoutes);

module.exports = router;
