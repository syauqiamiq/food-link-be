var express = require("express");

var router = express.Router();

const models = require("../models");

const Company = models.Company;

/* GET users listing. */
router.get("/", async function (req, res, next) {
	try {
		const data = await Company.findAll();
		res.status(200).json({
			tes: data,
		});
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = router;
