const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/api_formatter.util");

const authMiddleware = (req, res, next) => {
	const header = req.headers["authorization"];
	if (typeof header !== "undefined") {
		const token = header.split(" ")[1];
		jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
			if (err) {
				res
					.status(httpStatus.UNAUTHORIZED)
					.json(errorResponse(httpStatus["401_NAME"], httpStatus.UNAUTHORIZED));
			} else {
				next();
			}
		});
	} else {
		res
			.status(httpStatus.UNAUTHORIZED)
			.json(errorResponse(httpStatus["401_NAME"], httpStatus.UNAUTHORIZED));
	}
};

module.exports = authMiddleware;
