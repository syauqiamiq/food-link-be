require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const os = require("os");
const models = require("./models");

const { errorResponse } = require("./utils/api_formatter.util");
const httpStatus = require("http-status");

var app = express();
const OrderItemModel = models.OrderItem;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

const authRoutes = require("./routes/auth.route");
const appAdminRoutes = require("./routes/app-admin");
const companyAdminRoutes = require("./routes/company-admin");
const standAdminRoutes = require("./routes/stand-admin");
const dashboardRoutes = require("./routes/dashboard.route");
const transactionRoutes = require("./routes/transaction.route");

app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/transaction", transactionRoutes);
app.use("/app-admin", appAdminRoutes);
app.use("/company-admin", companyAdminRoutes);
app.use("/stand-admin", standAdminRoutes);
app.use("/health-check", async (req, res) => {
	res.json({ message: "Balancing Request", hostname: os.hostname() });
});
app.use("/load-test", async (req, res) => {
	const data = await OrderItemModel.findAll();
	res.json({
		message: "Balancing Request",
		hostname: os.hostname(),
		data: data,
	});
});
// Global error handler middleware
app.use((err, req, res, next) => {
	console.error(err);

	res
		.status(httpStatus.INTERNAL_SERVER_ERROR)
		.json(
			errorResponse(err.message, httpStatus.INTERNAL_SERVER_ERROR, err.errors)
		);
});
module.exports = app;
