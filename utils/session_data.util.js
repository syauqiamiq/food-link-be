const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const getSessionAccessData = async (req) => {
	const authorizationHeader = req.headers["authorization"];
	const token = authorizationHeader.split(" ")[1];
	const decodedToken = await jwt.verify(token, JWT_SECRET);
	return decodedToken;
};

module.exports = getSessionAccessData;
