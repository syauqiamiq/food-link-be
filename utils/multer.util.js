const multer = require("multer");
const path = require("path");

// Set up multer storage and upload configuration
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const multerHelper = multer({ storage: storage });

module.exports = multerHelper;
