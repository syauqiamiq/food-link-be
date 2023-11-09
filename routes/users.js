var express = require("express");

var router = express.Router();

const models = require("../models");
const { Op } = require("sequelize");

/* GET users listing. */
router.get("/", async function (req, res, next) {});

module.exports = router;
