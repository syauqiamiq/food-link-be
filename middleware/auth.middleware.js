const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
	const header = req.headers["authorization"];
	if (typeof header !== "undefined") {
		const token = header.split(" ")[1];
		jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
			if (err) {
				res.sendStatus(403);
			} else {
				next();
			}
		});
	} else {
		res.sendStatus(403);
	}
};

module.exports = authMiddleware;
