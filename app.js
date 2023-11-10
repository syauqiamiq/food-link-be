require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const authRoutes = require("./routes/auth.route");
const { errorResponse } = require("./utils/api_formatter.util");
const httpStatus = require("http-status");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use("/auth", authRoutes);
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
